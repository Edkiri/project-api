import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new HttpException(`Not found user with id "${userId}"`, 404);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const oldEmailUser = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (oldEmailUser) {
      throw new BadRequestException(
        'An account with this email already exists',
      );
    }
    const newUser = this.userRepository.create(data);
    const hashPassword = await bcrypt.hash(data.password, 10);
    newUser.password = hashPassword;
    const user = await this.userRepository.save(newUser);
    return this.userRepository.findOneOrFail({ where: { id: user.id } });
  }
}

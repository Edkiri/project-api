import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import config from 'src/config/config';
import { User } from 'src/user/entities/user.entity';
import { PayloadToken } from './models/token.model';
import { LoginResponseDto } from './dto/login-response.dto';
import { UserService } from 'src/user/user.service';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneByUsername(username);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      }
    }
    return null;
  }

  generateJWT(user: User): LoginResponseDto {
    const payload: PayloadToken = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}

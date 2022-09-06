import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWorkTypeDto } from '../dto/create-work-type.dto';
import { WorkType } from '../entities';

@Injectable()
export class WorkTypeService {
  constructor(
    @InjectRepository(WorkType) private workTypeRepo: Repository<WorkType>,
  ) {}

  async findOne(id: number) {
    const type = await this.workTypeRepo.findOne({
      where: { id },
    });
    if (!type) {
      throw new HttpException(`Not found work-type with id '${id}'.`, 404);
    }
    return type;
  }

  async find() {
    return this.workTypeRepo.find();
  }

  async create(data: CreateWorkTypeDto) {
    const { name } = data;
    const workType = await this.workTypeRepo.findOne({
      where: { name },
    });
    if (workType) {
      throw new BadRequestException(
        `Ya existe un tipo '${name}' en la base de datos`,
      );
    }
    return this.workTypeRepo.save(data);
  }
}

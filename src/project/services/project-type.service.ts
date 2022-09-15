import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectTypeDto } from '../dto';
import { ProjectType } from '../entities';

@Injectable()
export class ProjectTypeService {
  constructor(
    @InjectRepository(ProjectType)
    private projectTypeRepo: Repository<ProjectType>,
  ) {}

  async findOneByName(name: string) {
    const type = await this.projectTypeRepo.findOne({
      where: { name },
    });
    if (!type) {
      throw new HttpException(
        `Not found project-type with name '${name}'.`,
        404,
      );
    }
    return type;
  }

  async find() {
    return this.projectTypeRepo.find();
  }

  async create(data: CreateProjectTypeDto) {
    const { name } = data;
    const projectType = await this.projectTypeRepo.findOne({
      where: { name },
    });
    if (projectType) {
      throw new BadRequestException(
        `Ya existe un tipo '${name}' en la base de datos`,
      );
    }
    return this.projectTypeRepo.save(data);
  }
}

import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  HttpException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateWorkDto } from '../dto/create-work.dto';
import { Work } from '../entities/work.entity';
import { WorkTypeService } from './work-type.service';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(Work) private workRepo: Repository<Work>,
    private workTypeService: WorkTypeService,
  ) {}

  async create(data: CreateWorkDto) {
    const { description } = data;
    const type = await this.workTypeService.findOneByName(data.typeName);
    const oldWork = await this.workRepo.findOne({ where: { description } });
    if (oldWork)
      throw new BadRequestException(`Work '${description}' already exists.`);
    const newWork = this.workRepo.create(data);
    newWork.type = type;
    return this.workRepo.save(newWork);
  }

  async findOne(id: number) {
    const work = await this.workRepo.findOne({ where: { id } });
    if (!work) throw new NotFoundException(`Not found work with id '${id}'`);
    return work;
  }

  async findOneByDescription(description: string) {
    const work = await this.workRepo.findOne({
      where: { description },
    });
    if (!work) {
      throw new HttpException(
        `Not found work with description '${description}'.`,
        404,
      );
    }
    return work;
  }

  async findActiveWorks() {
    return this.workRepo.find({
      where: { isFinished: false },
    });
  }

  async findOneByWorkData(workData: CreateWorkDto) {
    const { description, clientName } = workData;
    const work = await this.workRepo.findOne({
      where: { description, clientName },
    });
    if (!work) throw new NotFoundException(`Not found work '${description}'`);
    return work;
  }
}

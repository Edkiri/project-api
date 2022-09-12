import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateWorkDto } from '../dto';

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

  async update(workId: number, changes: UpdateWorkDto) {
    const work = await this.findOne(workId);
    if (changes.typeName) {
      const type = await this.workTypeService.findOneByName(changes.typeName);
      work.type = type;
    }
    if (changes.description) {
      const oldWork = await this.findOneByDescription(changes.description);
      if (oldWork)
        throw new BadRequestException(
          `A work with description '${changes.description}' already exists`,
        );
    }
    this.workRepo.merge(work, changes);
    return this.workRepo.save(work);
  }

  async delete(workId: number) {
    const work = await this.findOne(workId);
    await this.workRepo.remove(work);
    return {
      message: 'Work deleted',
    };
  }

  async findOne(id: number) {
    const work = await this.workRepo.findOne({ where: { id } });
    if (!work) throw new NotFoundException(`Not found work with id '${id}'`);
    return work;
  }

  async findOneByDescription(description: string): Promise<Work | null> {
    return this.workRepo.findOne({
      where: { description },
    });
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

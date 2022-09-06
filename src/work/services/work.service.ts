import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
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
    const type = await this.workTypeService.findOneByName(data.typeName);
    const newWork = this.workRepo.create(data);
    newWork.type = type;
    return this.workRepo.save(newWork);
  }

  async findActiveWorks() {
    return this.workRepo.find({
      where: { isFinished: false },
    });
  }

  async findOneByWorkData(workData: CreateWorkDto) {
    const oldWork = await this.workRepo.findOne({
      where: workData,
    });
    console.log('OldWorkData', oldWork);
    if (!oldWork) {
      throw new HttpException(
        `Ya existe esta obra: '${oldWork.description} - ${oldWork.clientName}'`,
        400,
      );
    }
    return oldWork;
  }
}

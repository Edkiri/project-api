import { Injectable } from '@nestjs/common';
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
    const type = await this.workTypeService.findOne(data.typeId);
    const newWork = this.workRepo.create(data);
    newWork.type = type;
    return this.workRepo.save(newWork);
  }

  async findActiveWorks() {
    return this.workRepo.find({
      where: { isFinished: false },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkService } from 'src/work/services';
import { Repository } from 'typeorm';

import { CreateBudgetDto } from '../dto';
import { Budget } from '../entities';
import { BudgetUnitService } from './budget-unit.service';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget) private budgetRepo: Repository<Budget>,
    private budgetUnitService: BudgetUnitService,
    private workService: WorkService,
  ) {}

  async create(data: CreateBudgetDto) {
    const work = await this.workService.findOne(data.workId);
    const unit = await this.budgetUnitService.findOneByName(data.unitName);
    const newBudget = this.budgetRepo.create(data);
    newBudget.work = work;
    newBudget.unit = unit;
    return this.budgetRepo.save(newBudget);
  }

  async findOneByBudgetData(budgetData: CreateBudgetDto) {
    const oldBudget = await this.budgetRepo.findOne({
      where: budgetData,
    });
    if (!oldBudget) {
      throw new HttpException(
        `Ya existe esta obra: '${oldBudget.description}'`,
        400,
      );
    }
    return oldBudget;
  }
}

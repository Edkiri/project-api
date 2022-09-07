import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
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
    const work = await this.workService.findOneByDescription(
      data.workDescription,
    );
    const unit = await this.budgetUnitService.findOneByName(data.unitName);
    const newBudget = this.budgetRepo.create(data);
    newBudget.work = work;
    newBudget.unit = unit;
    return this.budgetRepo.save(newBudget);
  }

  async findOneByBudgetData(budgetData: CreateBudgetDto) {
    const { description, workDescription } = budgetData;
    const budget = await this.budgetRepo.findOne({
      where: { description, work: { description: workDescription } },
    });
    if (!budget)
      throw new NotFoundException(`Not found budget '${description}'`);
    return budget;
  }

  async findByWorkId(workId: number) {
    await this.workService.findOne(workId);
    return this.budgetRepo.find({ where: { work: { id: workId } } });
  }
}

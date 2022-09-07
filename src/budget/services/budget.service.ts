import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkService } from 'src/work/services';
import { Repository } from 'typeorm';

import { CreateBudgetDto, UpdateBudgetDto } from '../dto';
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

  async findOne(id: number) {
    const budget = await this.budgetRepo.findOne({ where: { id } });
    if (!budget)
      throw new NotFoundException(`Not found budget with id '${id}'`);
    return budget;
  }

  async update(budgetId: number, changes: UpdateBudgetDto) {
    const budget = await this.findOne(budgetId);
    if (changes.unitName) {
      const unit = await this.budgetUnitService.findOneByName(changes.unitName);
      budget.unit = unit;
    }
    this.budgetRepo.merge(budget, changes);
    return this.budgetRepo.save(budget);
  }

  async delete(budgetId: number) {
    const budget = await this.findOne(budgetId);
    await this.budgetRepo.remove(budget);
    return {
      message: 'Budget deleted',
    };
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

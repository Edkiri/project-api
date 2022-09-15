import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectService } from 'src/project/services';
import { Repository } from 'typeorm';

import { CreateBudgetDto, UpdateBudgetDto } from '../dto';
import { Budget } from '../entities';
import { BudgetUnitService } from './budget-unit.service';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget) private budgetRepo: Repository<Budget>,
    private budgetUnitService: BudgetUnitService,
    private projectService: ProjectService,
  ) {}

  async create(data: CreateBudgetDto) {
    const project = await this.projectService.findOneByDescription(
      data.projectDescription,
    );
    const unit = await this.budgetUnitService.findOneByName(data.unitName);
    const newBudget = this.budgetRepo.create(data);
    newBudget.project = project;
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
    const { description, projectDescription } = budgetData;
    const budget = await this.budgetRepo.findOne({
      where: { description, project: { description: projectDescription } },
    });
    if (!budget)
      throw new NotFoundException(`Not found budget '${description}'`);
    return budget;
  }

  async findByProjectId(projectId: number) {
    await this.projectService.findOne(projectId);
    return this.budgetRepo.find({ where: { project: { id: projectId } } });
  }
}

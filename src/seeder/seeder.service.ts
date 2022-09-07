import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { ConfigType } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import { TransactionFor } from 'nest-transact';
import { BudgetService, BudgetUnitService } from 'src/budget/services';
import config from 'src/config/config';

import { UserService } from 'src/user/user.service';
import { WorkService, WorkTypeService } from 'src/work/services';
import { budgetsData, workData, workTypesData } from './inital-data';
import { budgetUnitsData } from './inital-data/budget-unit.data';

@Injectable()
export class SeederService extends TransactionFor<SeederService> {
  constructor(
    @Inject(config.KEY)
    private configService: ConfigType<typeof config>,
    private userService: UserService,
    private workTypeService: WorkTypeService,
    private workService: WorkService,
    private budgetUnitService: BudgetUnitService,
    private budgetService: BudgetService,
    moduleRef: ModuleRef,
  ) {
    super(moduleRef);
  }

  async seed() {
    console.log('Starting seed...');
    await this.seedAdminUser();
    await this.seedWorkTypes();
    await this.seedWorks();
    await this.seedBudgetUnits();
    await this.seedBudgets();
  }

  async seedAdminUser() {
    const oldAdmin = await this.userService.findOneByUsername(
      this.configService.adminUser.username,
    );
    if (oldAdmin) return;
    await this.userService.create({
      email: this.configService.adminUser.email,
      password: this.configService.adminUser.password,
      username: this.configService.adminUser.username,
    });
  }

  async seedWorkTypes() {
    const createPromises = workTypesData.map(async (workType) => {
      try {
        await this.workTypeService.findOneByName(workType.name);
        return;
      } catch {
        return this.workTypeService.create(workType);
      }
    });
    await Promise.all(createPromises);
  }

  async seedWorks() {
    const createPromises = workData.map(async (work) => {
      try {
        await this.workService.findOneByWorkData(work);
        return;
      } catch {
        return this.workService.create(work);
      }
    });
    await Promise.all(createPromises);
  }

  async seedBudgetUnits() {
    const createPromises = budgetUnitsData.map(async (budgetUnit) => {
      try {
        await this.budgetUnitService.findOneByName(budgetUnit.name);
        return;
      } catch {
        return this.budgetUnitService.create(budgetUnit);
      }
    });
    await Promise.all(createPromises);
  }

  async seedBudgets() {
    const createPromises = budgetsData.map(async (budget) => {
      try {
        await this.budgetService.findOneByBudgetData(budget);
        return;
      } catch {
        return this.budgetService.create(budget);
      }
    });
    await Promise.all(createPromises);
  }
}

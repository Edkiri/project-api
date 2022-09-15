import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from 'src/project/project.module';

import { Budget, BudgetUnit } from './entities';
import { BudgetController, BudgetUnitController } from './controllers';
import { BudgetService, BudgetUnitService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Budget, BudgetUnit]), ProjectModule],
  controllers: [BudgetController, BudgetUnitController],
  providers: [BudgetService, BudgetUnitService],
  exports: [BudgetService, BudgetUnitService],
})
export class BudgetModule {}

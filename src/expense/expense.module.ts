import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './entities';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { BudgetModule } from 'src/budget/budget.module';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  imports: [TypeOrmModule.forFeature([Expense]), BudgetModule, PaymentModule],
  providers: [ExpenseService],
  controllers: [ExpenseController],
})
export class ExpenseModule {}

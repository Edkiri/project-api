import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { DataSource } from 'typeorm';

import { CreatePaymentDto } from 'src/payment/dto';
import { CreateExpenseDto, UpdateExpenseDto } from './dto';
import { ExpenseService } from './expense.service';

@Controller('budget/:budgetId/expense')
export class ExpenseController {
  constructor(
    private expenseService: ExpenseService,
    private dataSource: DataSource,
  ) {}

  @Post()
  createExpense(
    @Param('budgetId', ParseIntPipe) budgetId: number,
    @Body() data: CreateExpenseDto,
  ) {
    return this.expenseService.create(+budgetId, data);
  }

  @Get()
  getBudgetExpenses(@Param('budgetId', ParseIntPipe) budgetId: number) {
    return this.expenseService.findByBudgetId(+budgetId);
  }

  @Put(':expenseId')
  updateExpense(
    @Param('budgetId', ParseIntPipe) budgetId: number,
    @Param('expenseId', ParseIntPipe) expenseId: number,
    @Body() data: UpdateExpenseDto,
  ) {
    return this.expenseService.update(+budgetId, +expenseId, data);
  }

  @Delete(':expenseId')
  deleteExpense(
    @Param('budgetId', ParseIntPipe) budgetId: number,
    @Param('expenseId', ParseIntPipe) expenseId: number,
  ) {
    return this.expenseService.delete(+budgetId, +expenseId);
  }

  @Post(':expenseId/add-payment')
  async addPaymentToExpense(
    @Param('budgetId', ParseIntPipe) budgetId: number,
    @Param('expenseId', ParseIntPipe) expenseId: number,
    @Body() data: CreatePaymentDto,
  ) {
    const payment = await this.dataSource.transaction((manager) => {
      return this.expenseService
        .withTransaction(manager)
        .insertPayment(+budgetId, +expenseId, data);
    });
    return payment;
  }

  @Delete(':expenseId/remove-payment/:paymentId')
  async removePaymentFromExpense(
    @Param('paymentId', ParseIntPipe) paymentId: number,
  ) {
    const response = await this.dataSource.transaction((manager) => {
      return this.expenseService
        .withTransaction(manager)
        .removePayment(+paymentId);
    });
    return response;
  }
}

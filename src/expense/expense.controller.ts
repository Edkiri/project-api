import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { DataSource } from 'typeorm';

import { CreatePaymentDto } from 'src/payment/dto';
import { CreateExpenseDto, UpdateExpenseDto } from './dto';
import { ExpenseService } from './expense.service';

@Controller('expense')
export class ExpenseController {
  constructor(
    private expenseService: ExpenseService,
    private dataSource: DataSource,
  ) {}

  @Post()
  createExpense(@Body() data: CreateExpenseDto) {
    return this.expenseService.create(data);
  }

  @Put(':expenseId')
  updateExpense(
    @Param('expenseId', ParseIntPipe) expenseId: number,
    @Body() data: UpdateExpenseDto,
  ) {
    return this.expenseService.update(+expenseId, data);
  }

  @Delete(':expenseId')
  async deleteExpense(@Param('expenseId', ParseIntPipe) expenseId: number) {
    const response = await this.dataSource.transaction((manager) => {
      return this.expenseService.withTransaction(manager).delete(+expenseId);
    });
    return response;
  }

  @Post(':expenseId/payment')
  async addPaymentToExpense(
    @Param('expenseId', ParseIntPipe) expenseId: number,
    @Body() data: CreatePaymentDto,
  ) {
    const payment = await this.dataSource.transaction((manager) => {
      return this.expenseService
        .withTransaction(manager)
        .insertPayment(+expenseId, data);
    });
    return payment;
  }

  @Delete(':expenseId/payment/:paymentId')
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

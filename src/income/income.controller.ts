import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Delete,
  Get,
} from '@nestjs/common';
import { CreatePaymentDto } from 'src/payment/dto';
import { DataSource } from 'typeorm';
import { CreateIncomeDto } from './dto';
import { IncomeService } from './income.service';

@Controller('income')
export class IncomeController {
  constructor(
    private incomeService: IncomeService,
    private dataSource: DataSource,
  ) {}

  @Post()
  createIncome(@Body() data: CreateIncomeDto) {
    return this.incomeService.create(data);
  }

  @Get(':incomeId')
  getIncome(@Param('incomeId', ParseIntPipe) incomeId: number) {
    return this.incomeService.findOne(incomeId);
  }

  @Post(':incomeId/payment')
  async addPaymentToIncome(
    @Param('incomeId', ParseIntPipe) incomeId: number,
    @Body() data: CreatePaymentDto,
  ) {
    const payment = await this.dataSource.transaction((manager) => {
      return this.incomeService
        .withTransaction(manager)
        .insertPayment(+incomeId, data);
    });
    return payment;
  }

  @Delete(':incomeId/payment/:paymentId')
  async removePaymentFromincome(
    @Param('paymentId', ParseIntPipe) paymentId: number,
  ) {
    const response = await this.dataSource.transaction((manager) => {
      return this.incomeService
        .withTransaction(manager)
        .removePayment(+paymentId);
    });
    return response;
  }
}

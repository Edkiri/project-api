import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ModuleRef } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionFor } from 'nest-transact';
import { ExpenseService } from 'src/expense/expense.service';
import { CreatePaymentDto } from 'src/payment/dto';
import { PaymentService } from 'src/payment/services';
import { ProjectService } from 'src/project/services';
import { Repository } from 'typeorm';
import { CreateIncomeDto } from './dto';
import { Income } from './entities';

@Injectable()
export class IncomeService extends TransactionFor<ExpenseService> {
  constructor(
    @InjectRepository(Income) private incomeRepo: Repository<Income>,
    private projectService: ProjectService,
    private paymentService: PaymentService,
    moduleRef: ModuleRef,
  ) {
    super(moduleRef);
  }

  async create(data: CreateIncomeDto) {
    const project = await this.projectService.findOne(data.projectId);
    const newIncome = this.incomeRepo.create(data);
    newIncome.project = project;
    return this.incomeRepo.save(newIncome);
  }

  async findOne(incomeId: number, payments = false) {
    const income = await this.incomeRepo.findOne({
      where: { id: incomeId },
      relations: { payments },
    });
    if (!income) {
      throw new NotFoundException(`Not found income with id '${incomeId}'`);
    }
    return income;
  }

  async insertPayment(incomeId: number, data: CreatePaymentDto) {
    const income = await this.findOne(incomeId, true);
    const payment = await this.paymentService.create(data);
    income.payments.push(payment);
    await this.incomeRepo.save(income);
    return payment;
  }

  async removePayment(paymentId: number) {
    return this.paymentService.delete(paymentId);
  }
}

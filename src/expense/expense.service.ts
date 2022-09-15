import { Injectable, NotFoundException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionFor } from 'nest-transact';

import { BudgetService } from 'src/budget/services';
import { CreateExpenseDto, UpdateExpenseDto } from './dto';
import { Expense } from './entities';
import { CreatePaymentDto } from 'src/payment/dto';
import { PaymentService } from 'src/payment/services';

@Injectable()
export class ExpenseService extends TransactionFor<ExpenseService> {
  constructor(
    @InjectRepository(Expense) private expenseRepo: Repository<Expense>,
    private budgetService: BudgetService,
    private paymentService: PaymentService,
    moduleRef: ModuleRef,
  ) {
    super(moduleRef);
  }

  async create(budgetId: number, data: CreateExpenseDto) {
    const budget = await this.budgetService.findOne(budgetId);
    const newExpense = this.expenseRepo.create({ ...data });
    newExpense.budget = budget;
    return this.expenseRepo.save(newExpense);
  }

  async findOne(budgetId: number, expenseId: number, payments = false) {
    await this.budgetService.findOne(budgetId);
    const expense = await this.expenseRepo.findOne({
      where: { budget: { id: budgetId }, id: expenseId },
      relations: { payments },
    });
    if (!expense) {
      throw new NotFoundException(`Not found expense with id '${expenseId}'`);
    }
    return expense;
  }

  async findByBudgetId(budgetId: number) {
    await this.budgetService.findOne(budgetId);
    return this.expenseRepo.find({
      where: { budget: { id: budgetId } },
      relations: { payments: true },
    });
  }

  async update(budgetId: number, expenseId: number, changes: UpdateExpenseDto) {
    const expense = await this.findOne(budgetId, expenseId);
    this.expenseRepo.merge(expense, changes);
    return this.expenseRepo.save(expense);
  }

  async delete(budgetId: number, expenseId: number) {
    const expense = await this.findOne(budgetId, expenseId);
    await this.expenseRepo.remove(expense);
    return {
      message: 'Expense deleted',
    };
  }

  async insertPayment(
    budgetId: number,
    expenseId: number,
    data: CreatePaymentDto,
  ) {
    const expense = await this.findOne(budgetId, expenseId, true);
    const payment = await this.paymentService.create(data);
    expense.payments.push(payment);
    await this.expenseRepo.save(expense);
    return payment;
  }

  async removePayment(paymentId: number) {
    return this.paymentService.delete(paymentId);
  }
}

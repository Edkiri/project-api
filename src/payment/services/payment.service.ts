import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto, UpdatePaymentDto } from '../dto';
import { Payment } from '../entities';
import { AccountService } from './account.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
    private accountService: AccountService,
  ) {}

  async create(data: CreatePaymentDto) {
    const payment = this.paymentRepo.create(data);
    const account = await this.accountService.findOne(data.accountId);
    if (account.currency.name !== 'USD' && !payment.currencyRate) {
      throw new BadRequestException(
        `Se requiere una tasa en relación al dólar 'USD'`,
      );
    }
    if (account.balance < payment.amount) {
      throw new BadRequestException(
        `Fondo insuficiente de la cuenta '${account.platform} - ${account.owner}'`,
      );
    }
    if (account.currency.id !== payment.currency.id) {
      throw new BadRequestException(
        `No puedes registrar pagos en '${payment.currency.name}' con esta cuenta'`,
      );
    }
    payment.account = account;
    await this.accountService.update(account.id, {
      balance: account.balance - payment.amount,
    });
    return this.paymentRepo.save(payment);
  }

  async findOne(paymentId: number) {
    const payment = await this.paymentRepo.findOne({
      where: { id: paymentId },
    });
    if (!payment) {
      throw new NotFoundException(`Not found payment with id '${paymentId}'`);
    }
    return payment;
  }

  async update(paymentId: number, changes: UpdatePaymentDto) {
    const payment = await this.findOne(paymentId);
    this.paymentRepo.merge(payment, changes);
    return this.paymentRepo.save(payment);
  }

  async delete(paymentId: number) {
    const payment = await this.paymentRepo.findOne({
      where: { id: paymentId },
      relations: { account: true },
    });
    if (!payment) {
      throw new NotFoundException(`Not found payment with id '${paymentId}'`);
    }
    await this.accountService.update(payment.account.id, {
      balance: payment.account.balance + payment.amount,
    });
    await this.paymentRepo.remove(payment);
    return {
      message: 'Payment deleted',
    };
  }
}

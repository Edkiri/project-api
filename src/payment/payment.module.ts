import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Account, Currency, Payment } from './entities';
import { AccountService, CurrencyService, PaymentService } from './services';
import {
  AccountController,
  CurrencyController,
  PaymentController,
} from './controllers';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Account, Currency])],
  providers: [AccountService, PaymentService, CurrencyService],
  controllers: [AccountController, PaymentController, CurrencyController],
  exports: [PaymentService, AccountService],
})
export class PaymentModule {}

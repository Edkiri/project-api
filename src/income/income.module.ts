import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IncomeService } from './income.service';
import { IncomeController } from './income.controller';
import { Income } from './entities';
import { PaymentModule } from 'src/payment/payment.module';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [TypeOrmModule.forFeature([Income]), ProjectModule, PaymentModule],
  providers: [IncomeService],
  controllers: [IncomeController],
})
export class IncomeModule {}

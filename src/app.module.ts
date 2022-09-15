import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

import config from './config/config';
import configSchema from './config/config.schema';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { SeederModule } from './seeder/seeder.module';
import { BudgetModule } from './budget/budget.module';
import { PaymentModule } from './payment/payment.module';
import { ExpenseModule } from './expense/expense.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: configSchema,
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    SeederModule,
    BudgetModule,
    ExpenseModule,
    PaymentModule,
    ProjectModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

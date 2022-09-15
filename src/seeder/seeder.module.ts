import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from 'src/config/config';
import configSchema from 'src/config/config.schema';
import { BudgetModule } from 'src/budget/budget.module';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';
import { SeederService } from './seeder.service';
import { ProjectModule } from 'src/project/project.module';

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
    ProjectModule,
    BudgetModule,
  ],
  providers: [SeederService],
})
export class SeederModule {}

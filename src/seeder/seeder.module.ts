import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from 'src/config/config';
import configSchema from 'src/config/config.schema';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';
import { WorkModule } from 'src/work/work.module';
import { SeederService } from './seeder.service';

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
    WorkModule,
  ],
  providers: [SeederService],
})
export class SeederModule {}

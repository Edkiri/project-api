import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

import config from './config/config';
import configSchema from './config/config.schema';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { WorkModule } from './work/work.module';

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
    WorkModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

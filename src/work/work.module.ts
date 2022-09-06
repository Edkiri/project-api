import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Work, WorkType } from './entities';
import { WorkController, WorkTypeController } from './controllers';
import { WorkService, WorkTypeService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Work, WorkType])],
  controllers: [WorkController, WorkTypeController],
  providers: [WorkService, WorkTypeService],
})
export class WorkModule {}

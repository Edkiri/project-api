import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController, ProjectTypeController } from './controllers';

import { Project, ProjectType } from './entities';
import { ProjectService, ProjectTypeService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectType])],
  providers: [ProjectService, ProjectTypeService],
  controllers: [ProjectController, ProjectTypeController],
  exports: [ProjectService, ProjectTypeService],
})
export class ProjectModule {}

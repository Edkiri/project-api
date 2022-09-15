import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateProjectTypeDto } from '../dto/create-project-type.dto';
import { ProjectTypeService } from '../services/project-type.service';

@UseGuards(JwtAuthGuard)
@Controller('project-type')
export class ProjectTypeController {
  constructor(private projectTypeService: ProjectTypeService) {}

  @Post()
  createProjectType(@Body() data: CreateProjectTypeDto) {
    return this.projectTypeService.create(data);
  }

  @Get()
  listProjectTypes() {
    return this.projectTypeService.find();
  }
}

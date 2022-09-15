import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UpdateProjectDto } from '../dto';
import { CreateProjectDto } from '../dto/create-project.dto';
import { ProjectService } from '../services/project.service';

@UseGuards(JwtAuthGuard)
@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  createProject(@Body() data: CreateProjectDto) {
    return this.projectService.create(data);
  }

  @Get()
  listActiveProjects() {
    return this.projectService.findActiveProjects();
  }

  @Put(':projectId')
  updateProject(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() data: UpdateProjectDto,
  ) {
    return this.projectService.update(+projectId, data);
  }

  @Delete(':projectId')
  deleteProject(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.projectService.delete(+projectId);
  }
}

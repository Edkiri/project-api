import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateWorkTypeDto } from '../dto/create-work-type.dto';
import { WorkTypeService } from '../services/work-type.service';

@UseGuards(JwtAuthGuard)
@Controller('work-type')
export class WorkTypeController {
  constructor(private workTypeService: WorkTypeService) {}

  @Post()
  createWorkType(@Body() data: CreateWorkTypeDto) {
    return this.workTypeService.create(data);
  }

  @Get()
  listWorkTypes() {
    return this.workTypeService.find();
  }
}

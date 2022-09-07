import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateWorkDto } from '../dto/create-work.dto';
import { WorkService } from '../services/work.service';

@UseGuards(JwtAuthGuard)
@Controller('work')
export class WorkController {
  constructor(private workService: WorkService) {}

  @Post()
  createWork(@Body() data: CreateWorkDto) {
    return this.workService.create(data);
  }

  @Get('list-active')
  listActiveWorks() {
    return this.workService.findActiveWorks();
  }
}

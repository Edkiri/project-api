import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateWorkDto } from '../dto/create-work.dto';
import { WorkService } from '../services/work.service';

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

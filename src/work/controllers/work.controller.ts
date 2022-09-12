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
import { UpdateWorkDto } from '../dto';
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

  @Get()
  listActiveWorks() {
    return this.workService.findActiveWorks();
  }

  @Put(':workId')
  updateWork(
    @Param('workId', ParseIntPipe) workId: number,
    @Body() data: UpdateWorkDto,
  ) {
    return this.workService.update(+workId, data);
  }

  @Delete(':workId')
  deleteWork(@Param('workId', ParseIntPipe) workId: number) {
    return this.workService.delete(+workId);
  }
}

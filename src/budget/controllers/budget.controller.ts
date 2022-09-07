import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateBudgetDto } from '../dto';
import { BudgetService } from '../services';

@Controller('work/:workId/budget')
export class BudgetController {
  constructor(private budgetService: BudgetService) {}

  @Post()
  createBudget(@Body() data: CreateBudgetDto) {
    return this.budgetService.create(data);
  }

  @Get()
  listBudgets(@Param('workId', ParseIntPipe) workId: number) {
    return this.budgetService.findByWorkId(+workId);
  }
}

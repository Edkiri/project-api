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
import { CreateBudgetDto, UpdateBudgetDto } from '../dto';
import { BudgetService } from '../services';

@UseGuards(JwtAuthGuard)
@Controller('project/:projectId/budget')
export class BudgetController {
  constructor(private budgetService: BudgetService) {}

  @Post()
  createBudget(@Body() data: CreateBudgetDto) {
    return this.budgetService.create(data);
  }

  @Get()
  listBudgets(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.budgetService.findByProjectId(+projectId);
  }

  @Put(':budgetId')
  updateBudget(
    @Param('budgetId', ParseIntPipe) budgetId: number,
    @Body() data: UpdateBudgetDto,
  ) {
    return this.budgetService.update(+budgetId, data);
  }

  @Delete(':budgetId')
  deleteBudget(@Param('budgetId', ParseIntPipe) budgetId: number) {
    return this.budgetService.delete(+budgetId);
  }
}

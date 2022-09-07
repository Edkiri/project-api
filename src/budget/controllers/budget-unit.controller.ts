import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateBudgetUnitDto } from '../dto';
import { BudgetUnitService } from '../services';

@UseGuards(JwtAuthGuard)
@Controller('budget-unit')
export class BudgetUnitController {
  constructor(private budgetUnitService: BudgetUnitService) {}

  @Post()
  createBudgetUnit(@Body() data: CreateBudgetUnitDto) {
    return this.budgetUnitService.create(data);
  }

  @Get()
  listBudgetUnit() {
    return this.budgetUnitService.find();
  }
}

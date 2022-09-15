import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateCurrencyDto } from '../dto';
import { CurrencyService } from '../services';

@UseGuards(JwtAuthGuard)
@Controller('currency')
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}

  @Post()
  createBudgetUnit(@Body() data: CreateCurrencyDto) {
    return this.currencyService.create(data);
  }

  @Get()
  listBudgetUnit() {
    return this.currencyService.find();
  }
}

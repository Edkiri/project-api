import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateAccountDto, UpdateAccountDto } from '../dto';
import { AccountService } from '../services/account.service';

@UseGuards(JwtAuthGuard)
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post()
  createAccount(@Body() data: CreateAccountDto) {
    return this.accountService.create(data);
  }

  @Get()
  getAccountList() {
    return this.accountService.find();
  }

  @Put(':accountId')
  updateAccount(
    @Param('accountId', ParseIntPipe) accountId: number,
    @Body() data: UpdateAccountDto,
  ) {
    return this.accountService.update(+accountId, data);
  }

  @Delete(':accountId')
  deleteAccount(@Param('accountId', ParseIntPipe) accountId: number) {
    return this.accountService.delete(+accountId);
  }
}

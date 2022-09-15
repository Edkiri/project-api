import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UpdatePaymentDto } from '../dto';
import { PaymentService } from '../services';

@UseGuards(JwtAuthGuard)
@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Put(':paymentId')
  updateAccount(
    @Param('paymentId', ParseIntPipe) paymentId: number,
    @Body() data: UpdatePaymentDto,
  ) {
    return this.paymentService.update(+paymentId, data);
  }

  @Delete(':paymentId')
  deleteAccount(@Param('paymentId', ParseIntPipe) paymentId: number) {
    return this.paymentService.delete(+paymentId);
  }
}

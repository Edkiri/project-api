import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  @IsPositive()
  accountId: number;

  @IsNumber()
  @IsPositive()
  currencyId: number;

  @IsNumber()
  amount: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  currencyRate?: number;
}

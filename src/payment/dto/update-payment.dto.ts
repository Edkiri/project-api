import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class UpdatePaymentDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  accountId?: number;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  currencyRate?: number;
}

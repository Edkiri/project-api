import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateBudgetDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  quantity?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  unitPrice?: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  unitName?: string;
}

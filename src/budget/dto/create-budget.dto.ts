import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateBudgetDto {
  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @IsPositive()
  quantity!: number;

  @IsNumber()
  @IsPositive()
  unitPrice!: number;

  @IsNumber()
  @IsPositive()
  workId!: number;

  @IsString()
  @IsNotEmpty()
  unitName!: string;
}

import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateWorkDto {
  @IsNumber()
  @IsPositive()
  typeId!: number;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  clientName!: string;
}

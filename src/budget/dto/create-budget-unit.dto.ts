import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBudgetUnitDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}

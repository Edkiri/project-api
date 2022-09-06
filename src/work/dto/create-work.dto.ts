import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkDto {
  @IsString()
  @IsNotEmpty()
  typeName!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  clientName!: string;
}

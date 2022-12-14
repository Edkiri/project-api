import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateWorkDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  typeName?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  clientName?: string;
}

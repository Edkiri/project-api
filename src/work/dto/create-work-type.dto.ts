import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

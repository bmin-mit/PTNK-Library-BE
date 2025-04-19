import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsInt()
  @ValidateIf((object, value) => !!value)
  quantity?: number;

  @ApiProperty()
  @IsInt()
  @ValidateIf((object, value) => !!value)
  stock?: number;

  @ApiProperty()
  @IsString()
  @ValidateIf((object, value) => !!value)
  position?: string;
}

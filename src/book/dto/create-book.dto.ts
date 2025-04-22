import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsInt()
  @ValidateIf((object, value) => value !== undefined)
  quantity?: number;

  @ApiProperty()
  @IsInt()
  @ValidateIf((object, value) => value !== undefined)
  stock?: number;

  @ApiProperty()
  @IsString()
  @ValidateIf((object, value) => !!value)
  position?: string;

  @ApiProperty()
  @IsString()
  @ValidateIf((object, value) => !!value)
  author?: string;

  @ApiProperty()
  @IsString()
  @ValidateIf((object, value) => !!value)
  publisher?: string;

  @ApiProperty()
  @IsInt()
  @ValidateIf((object, value) => value !== undefined)
  publishYear?: number;

  @ApiProperty()
  isbn?: string;

  @ApiProperty()
  language?: string;
}

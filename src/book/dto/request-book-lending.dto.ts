import { IsDateString, IsInt } from 'class-validator';

export class RequestBookLendingDto {
  @IsInt()
  bookId: number;

  @IsDateString()
  returnDate: Date;

  @IsInt()
  quantity: number;
}

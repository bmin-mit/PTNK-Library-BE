import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../common/enums/user-role.enum';
import { RequestBookLendingDto } from './dto/request-book-lending.dto';
import { AuthRequest } from '../common/types/auth-request.type';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard(UserRole.ADMIN))
  createBook(@Body() createBookDto: CreateBookDto) {
    return this.bookService.createBook(createBookDto);
  }

  @Get()
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  @Post('request-lending')
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard(UserRole.USER))
  requestLending(
    @Body() requestBookLendingDto: RequestBookLendingDto,
    @Request() req: AuthRequest,
  ) {
    const user = req.user;

    return this.bookService.requestLending(user, requestBookLendingDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard(UserRole.ADMIN))
  deleteBook(@Param('id') id: number) {
    return this.bookService.deleteBook(id);
  }
}

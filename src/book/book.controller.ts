import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
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

  @Get(':id')
  getBookById(@Param('id') id: number) {
    return this.bookService.getBookById(id);
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

  @Get('request-lending')
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard(UserRole.USER))
  getLendingRequests(@Request() req: AuthRequest) {
    const user = req.user;

    return this.bookService.getLendingRequests(user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard(UserRole.ADMIN))
  deleteBook(@Param('id') id: number) {
    return this.bookService.deleteBook(id);
  }

  // Admin endpoint for book
  @Get('all-lending-status')
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard(UserRole.ADMIN))
  getAllLendingStatus() {
    return this.bookService.getAllLendingStatus();
  }

  @Get('requested-lending')
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard(UserRole.ADMIN))
  getAllLendingRequests() {
    return this.bookService.getAllLendingRequests();
  }

  @Post('approve-lending/:id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard(UserRole.ADMIN))
  approveLending(@Param('id') id: number) {
    return this.bookService.approveLending(id);
  }

  @Post('reject-lending/:id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard(UserRole.ADMIN))
  rejectLending(@Param('id') id: number) {
    return this.bookService.rejectLending(id);
  }

  @Post('return-lending/:id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard(UserRole.ADMIN))
  returnLending(@Param('id') id: number) {
    return this.bookService.returnLending(id);
  }
}

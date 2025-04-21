import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { User } from '../user/entities/user.entity';
import { BookLendingStatus } from './entities/book-lending-status.entity';
import { RequestBookLendingDto } from './dto/request-book-lending.dto';
import { LendingStatus } from '../common/enums/lending-status.enum';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(BookLendingStatus)
    private readonly bookLendingStatusRepository: Repository<BookLendingStatus>,
  ) {}

  async createBook(createBookDto: CreateBookDto) {
    const book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
  }

  async getAllBooks() {
    return this.bookRepository.find({});
  }

  async requestLending(user: User, requestDto: RequestBookLendingDto) {
    const book = await this.bookRepository.findOne({
      where: { id: requestDto.bookId },
    });
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    const lendingStatus = this.bookLendingStatusRepository.create({
      book,
      user,
      ...requestDto,
      status: LendingStatus.REQUESTED,
    });

    return this.bookLendingStatusRepository.save(lendingStatus);
  }

  async deleteBook(id: number) {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return this.bookRepository.remove(book);
  }
}

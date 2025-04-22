import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    if (!createBookDto.stock || createBookDto.stock <= 0) {
      createBookDto.stock = createBookDto.quantity;
    }
    const book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
  }

  getAllBooks() {
    return this.bookRepository.find({});
  }

  getBookById(id: number) {
    return this.bookRepository.findOne({ where: { id } });
  }

   getAllLendingRequests() {
    return this.bookLendingStatusRepository.find({
      where: {
        status: LendingStatus.REQUESTED,
      },
    });
  }

   getLendingRequests(user: User) {
    return this.bookLendingStatusRepository.find({
      where: {
        user: { id: user.id },
        status: LendingStatus.REQUESTED,
      },
      relations: ['book'],
    });
  }

  async getAllLendingStatus() {
    const res = await this.bookLendingStatusRepository.find({
      relations: ['book', 'user'],
    });

    return res.map((lendingStatus) => ({
      ...lendingStatus,
      user: {
        ...lendingStatus.user,
        password: undefined,
      },
    }));
  }

  async approveLending(id: number) {
    const lendingStatus = await this.bookLendingStatusRepository.findOne({
      where: {
        id,
      },
      relations: ['book'],
    });

    if (!lendingStatus) {
      throw new NotFoundException('Lending request not found');
    }

    if (lendingStatus.status !== LendingStatus.REQUESTED) {
      throw new NotFoundException('Lending request not in requested status');
    }

    const book = lendingStatus.book;

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    if (book.stock < lendingStatus.quantity) {
      throw new BadRequestException('Not enough stock available');
    }

    book.stock -= lendingStatus.quantity;
    lendingStatus.status = LendingStatus.APPROVED;

    await this.bookRepository.save(book);
    await this.bookLendingStatusRepository.save(lendingStatus);

    return {
      message: 'Lending successfully',
    };
  }

  async rejectLending(id: number) {
    const lendingStatus = await this.bookLendingStatusRepository.findOne({
      where: {
        id,
      },
    });

    if (!lendingStatus) {
      throw new NotFoundException('Lending request not found');
    }

    if (lendingStatus.status !== LendingStatus.REQUESTED) {
      throw new NotFoundException('Lending request not in requested status');
    }

    lendingStatus.status = LendingStatus.REJECTED;

    await this.bookLendingStatusRepository.save(lendingStatus);

    return {
      message: 'Lending rejected successfully',
    };
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

  async returnLending(id: number) {
    const lendingStatus = await this.bookLendingStatusRepository.findOne({
      where: {
        id,
      },
      relations: ['book'],
    });

    if (!lendingStatus) {
      throw new NotFoundException('Lending request not found');
    }

    if (lendingStatus.status !== LendingStatus.APPROVED) {
      throw new NotFoundException('Lending request not in approved status');
    }

    const book = lendingStatus.book;
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    book.stock += lendingStatus.quantity;
    lendingStatus.status = LendingStatus.RETURNED;

    await this.bookRepository.save(book);
    await this.bookLendingStatusRepository.save(lendingStatus);

    return {
      message: 'Book returned successfully',
    };
  }

  async deleteBook(id: number) {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return this.bookRepository.remove(book);
  }
}

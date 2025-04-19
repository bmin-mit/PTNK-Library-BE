import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { AuthModule } from '../auth/auth.module';
import { BookLendingStatus } from './entities/book-lending-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookLendingStatus]), AuthModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}

import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/types/base.entity';
import { BookLendingStatus } from './book-lending-status.entity';

@Entity()
export class Book extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  author?: string;

  @Column({ default: 0 })
  quantity: number;

  @Column({ default: 0 })
  stock: number; // number of books available for borrowing

  @Column({ nullable: true })
  position?: string; // position of the book in the library

  @Column({ nullable: true })
  publisher?: string;

  @Column({ nullable: true })
  publishYear?: number;

  @Column({ nullable: true })
  isbn?: string;

  @Column({ nullable: true })
  language?: string;

  @OneToMany(
    () => BookLendingStatus,
    (bookLendingStatus) => bookLendingStatus.book,
  )
  lendingStatuses: BookLendingStatus[];
}

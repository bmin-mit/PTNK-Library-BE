import { BaseEntity } from '../../common/types/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Book } from './book.entity';
import { LendingStatus } from '../../common/enums/lending-status.enum';
import { User } from '../../user/entities/user.entity';

@Entity()
export class BookLendingStatus extends BaseEntity {
  @ManyToOne(() => Book, (book) => book.lendingStatuses, {
    onDelete: 'CASCADE',
  })
  book: Book;

  @ManyToOne(() => User, (user) => user.lendingStatuses)
  user: User;

  @Column()
  quantity: number;

  @Column()
  status: LendingStatus;

  @Column({ nullable: true })
  returnDate: Date;
}

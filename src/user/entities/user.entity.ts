import { Column, Entity, OneToMany } from 'typeorm';
import { UserRole } from '../../common/enums/user-role.enum';
import { BaseEntity } from '../../common/types/base.entity';
import { BookLendingStatus } from '../../book/entities/book-lending-status.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  dateOfBirth: Date;

  @Column({ default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => BookLendingStatus, (lendingStatus) => lendingStatus.user)
  lendingStatuses: BookLendingStatus[];
}

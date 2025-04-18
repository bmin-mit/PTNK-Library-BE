import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../../common/enums/user-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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
}

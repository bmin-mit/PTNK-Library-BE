import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../common/enums/user-role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user: DeepPartial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    newUser.password = await this.hashPassword(newUser.password);

    return this.userRepository.save(newUser);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async findByRole(role: UserRole): Promise<User[]> {
    return this.userRepository.find({ where: { role } });
  }
}

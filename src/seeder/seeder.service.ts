import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRole } from '../common/enums/user-role.enum';
import { UserService } from '../user/user.service';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  logger = new Logger(SeederService.name);

  async onApplicationBootstrap() {
    await this.seed();
  }

  private async seed() {
    if (await this.checkSeedingAlreadyDone()) {
      this.logger.log('Seeding already done, skipping...');
      return;
    }

    this.logger.log('Starting seeding process');
    await this.createAdmin();
    this.logger.log('Seeding completed');
  }

  private async checkSeedingAlreadyDone() {
    const admins = await this.userService.findByRole(UserRole.ADMIN);
    return admins.length > 0;
  }

  private async createAdmin() {
    const email = this.configService.get<string>('DEFAULT_ADMIN_EMAIL');
    const password = this.configService.get<string>('DEFAULT_ADMIN_PASS');

    if (!email || !password) {
      throw new Error('Admin email or password not provided');
    }

    await this.userService.createUser({
      email,
      password,
      name: 'ADMIN',
      dateOfBirth: '2000-01-01',
      role: UserRole.ADMIN,
    });
  }
}

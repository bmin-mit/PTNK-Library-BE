import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import type { DeepPartial, Repository } from 'typeorm';
import type { RegisterDto } from './dto/register.dto';
import type { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../common/types/jwt-payload.type';
import { UserService } from '../user/user.service';
import { UserRole } from '../common/enums/user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto, role = UserRole.USER) {
    const existingEmail = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingEmail) {
      throw new BadRequestException('Email already exists');
    }

    const user = {
      ...registerDto,
      role,
    } satisfies DeepPartial<User>;

    await this.userService.createUser(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    return {
      accessToken: this.generateToken(user),
    };
  }

  private generateToken(user: User) {
    const payload = { sub: user.id, role: user.role } satisfies JwtPayload;
    return this.jwtService.sign(payload);
  }
}

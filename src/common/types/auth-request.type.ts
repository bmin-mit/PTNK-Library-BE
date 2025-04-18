import { Request } from 'express';
import { User } from '../../user/entities/user.entity';

export class AuthRequest extends Request {
  user: User;
}

import { UserRole } from '../enums/user-role.enum';

export class JwtPayload {
  sub: number;
  role: UserRole;
}

import { UserRole } from '../common/enums/user-role.enum';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
  Type,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload } from '../common/types/jwt-payload.type';

export function RolesGuard(...roles: UserRole[]): Type<CanActivate> {
  @Injectable()
  class AuthGuardMixin implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<Request>();
      const token = this.extractTokenFromHeader(request);

      if (!token) {
        throw new UnauthorizedException();
      }

      try {
        const tokenData: JwtPayload = await this.jwtService.verifyAsync(token);
        if (!roles || roles.length === 0) {
          return true;
        }

        if (tokenData.role && roles.includes(tokenData.role)) {
          return true;
        }
      } catch {
        throw new UnauthorizedException();
      }

      throw new UnauthorizedException();
    }

    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }

  return mixin(AuthGuardMixin);
}

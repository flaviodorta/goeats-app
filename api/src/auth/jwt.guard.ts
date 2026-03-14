import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import type { Request } from 'express';

const JWT_SECRET = process.env.JWT_SECRET ?? 'goeats_secret_dev';

@Injectable()
export class JwtGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const auth = req.headers.authorization;

    if (!auth?.startsWith('Bearer ')) throw new UnauthorizedException();

    try {
      const payload = jwt.verify(auth.slice(7), JWT_SECRET) as {
        sub: string;
        email: string;
      };
      (req as any).user = { id: payload.sub, email: payload.email };
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}

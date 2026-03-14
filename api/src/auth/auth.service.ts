import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../prisma/prisma.service';

const JWT_SECRET = process.env.JWT_SECRET ?? 'goeats_secret_dev';

export interface AuthResponse {
  token: string;
  user: { id: number; name: string; email: string; phone: string };
}

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(
    name: string,
    email: string,
    password: string,
    phone: string,
  ): Promise<AuthResponse> {
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new ConflictException('E-mail já cadastrado');

    const password_hash = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { name, email, password_hash, phone },
      select: { id: true, name: true, email: true, phone: true },
    });

    const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '30d',
    });
    return { token, user };
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const row = await this.prisma.user.findUnique({ where: { email } });
    if (!row) throw new UnauthorizedException('E-mail ou senha inválidos');

    const valid = await bcrypt.compare(password, row.password_hash);
    if (!valid) throw new UnauthorizedException('E-mail ou senha inválidos');

    const token = jwt.sign({ sub: row.id, email: row.email }, JWT_SECRET, {
      expiresIn: '30d',
    });
    return {
      token,
      user: { id: row.id, name: row.name, email: row.email, phone: row.phone },
    };
  }
}

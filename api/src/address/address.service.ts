import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateAddressDto {
  label: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zip_code: string;
}

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  list(userId: number) {
    return this.prisma.address.findMany({
      where: { user_id: userId },
      orderBy: [{ is_default: 'desc' }, { created_at: 'desc' }],
    });
  }

  async create(userId: number, dto: CreateAddressDto) {
    const count = await this.prisma.address.count({
      where: { user_id: userId },
    });
    return this.prisma.address.create({
      data: { ...dto, user_id: userId, is_default: count === 0 },
    });
  }

  async setDefault(userId: number, id: number) {
    await this.assertOwner(userId, id);
    await this.prisma.address.updateMany({
      where: { user_id: userId },
      data: { is_default: false },
    });
    return this.prisma.address.update({
      where: { id },
      data: { is_default: true },
    });
  }

  async remove(userId: number, id: number) {
    await this.assertOwner(userId, id);
    await this.prisma.address.delete({ where: { id } });
  }

  private async assertOwner(userId: number, id: number) {
    const addr = await this.prisma.address.findUnique({ where: { id } });
    if (!addr) throw new NotFoundException('Endereço não encontrado');
    if (addr.user_id !== userId) throw new ForbiddenException();
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaymentMethod } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

const VALID_COUPONS: Record<string, number> = {
  PROMO10: 0.1,
  IFOOD20: 0.2,
  GOEATS5: 0.05,
};

export interface CreateOrderDto {
  restaurant_id: number;
  payment_method: PaymentMethod;
  coupon_code?: string;
  delivery_fee: number;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zip_code: string;
  };
  items: { menu_item_id: number; quantity: number }[];
}

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, dto: CreateOrderDto) {
    if (!dto.items.length) throw new BadRequestException('Carrinho vazio');

    // Busca os itens do cardápio para validar e criar o snapshot de preço
    const menuItems = await this.prisma.menuItem.findMany({
      where: {
        id: { in: dto.items.map((i) => i.menu_item_id) },
        restaurant_id: dto.restaurant_id,
      },
    });

    if (menuItems.length !== dto.items.length) {
      throw new BadRequestException('Um ou mais itens são inválidos');
    }

    const menuItemMap = new Map(menuItems.map((m) => [m.id, m]));

    const subtotal = dto.items.reduce((sum, i) => {
      return sum + menuItemMap.get(i.menu_item_id)!.price * i.quantity;
    }, 0);

    const discountRate = dto.coupon_code
      ? (VALID_COUPONS[dto.coupon_code.toUpperCase()] ?? 0)
      : 0;
    const discount = parseFloat((subtotal * discountRate).toFixed(2));
    const total = parseFloat(
      (subtotal + dto.delivery_fee - discount).toFixed(2),
    );

    const order = await this.prisma.$transaction(async (tx) => {
      const created = await tx.order.create({
        data: {
          user_id: userId,
          restaurant_id: dto.restaurant_id,
          payment_method: dto.payment_method,
          subtotal,
          delivery_fee: dto.delivery_fee,
          discount,
          total,
          coupon_code: dto.coupon_code ?? null,
          address_street: dto.address.street,
          address_number: dto.address.number,
          address_complement: dto.address.complement ?? null,
          address_neighborhood: dto.address.neighborhood,
          address_city: dto.address.city,
          address_state: dto.address.state,
          address_zip_code: dto.address.zip_code,
          items: {
            create: dto.items.map((i) => ({
              menu_item_id: i.menu_item_id,
              name: menuItemMap.get(i.menu_item_id)!.name,
              price: menuItemMap.get(i.menu_item_id)!.price,
              quantity: i.quantity,
            })),
          },
          history: {
            create: { status: 'pending', actor: 'system' },
          },
        },
        include: { items: true, history: true },
      });

      return created;
    });

    return order;
  }

  list(userId: number) {
    return this.prisma.order.findMany({
      where: { user_id: userId },
      include: {
        items: true,
        history: { orderBy: { created_at: 'desc' } },
        restaurant: { select: { id: true, name: true, icon_name: true, icon_color: true } },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async findOne(userId: number, orderId: number) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, user_id: userId },
      include: {
        items: true,
        history: { orderBy: { created_at: 'asc' } },
        restaurant: { select: { id: true, name: true, icon_name: true, icon_color: true } },
      },
    });
    if (!order) throw new NotFoundException('Pedido não encontrado');
    return order;
  }
}

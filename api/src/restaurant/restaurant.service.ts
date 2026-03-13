import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MenuItem, Restaurant } from '@prisma/client';

export type RestaurantRow = Omit<Restaurant, 'categories'> & {
  categories: string[];
};
export type MenuItemRow = MenuItem;

@Injectable()
export class RestaurantService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(category?: string): Promise<RestaurantRow[]> {
    const rows = await this.prisma.restaurant.findMany({
      include: { categories: { include: { category: true } } },
      where: category
        ? { categories: { some: { category: { name: category } } } }
        : undefined,
      orderBy: [{ promoted: 'desc' }, { rating: 'desc' }],
    });

    return rows.map((r) => ({
      ...r,
      categories: r.categories.map((rc) => rc.category.name),
    }));
  }

  async findOne(id: string): Promise<RestaurantRow | null> {
    const row = await this.prisma.restaurant.findUnique({
      where: { id },
      include: { categories: { include: { category: true } } },
    });

    if (!row) return null;

    return {
      ...row,
      categories: row.categories.map((rc) => rc.category.name),
    };
  }

  async findMenu(restaurantId: string): Promise<MenuItemRow[]> {
    return this.prisma.menuItem.findMany({
      where: { restaurant_id: restaurantId },
      orderBy: { tab: 'asc' },
    });
  }
}

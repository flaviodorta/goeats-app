import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_TOKEN } from '../database/database.module';

export interface RestaurantRow {
  id: string;
  name: string;
  categories: string[];
  rating: number;
  delivery_fee: string;
  delivery_time: string;
  distance: string;
  icon_name: string;
  icon_color: string;
  promoted: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface MenuItemRow {
  id: string;
  restaurant_id: string;
  name: string;
  description: string;
  price: number;
  tab: 'popular' | 'mains' | 'drinks' | 'desserts';
  icon_name: string;
  created_at: Date;
  updated_at: Date;
}

@Injectable()
export class RestaurantService {
  constructor(@Inject(KNEX_TOKEN) private readonly db: Knex) {}

  async findAll(category?: string): Promise<RestaurantRow[]> {
    const query = this.db<RestaurantRow>('restaurants')
      .orderBy('promoted', 'desc')
      .orderBy('rating', 'desc');

    if (category) {
      query.whereRaw('? = ANY(categories)', [category]);
    }

    return query.select('*');
  }

  async findOne(id: string): Promise<RestaurantRow | undefined> {
    return this.db<RestaurantRow>('restaurants').where({ id }).first();
  }

  async findMenu(restaurantId: string): Promise<MenuItemRow[]> {
    return this.db<MenuItemRow>('menu_items')
      .where({ restaurant_id: restaurantId })
      .orderBy('tab')
      .select('*');
  }
}

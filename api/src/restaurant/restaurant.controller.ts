import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  findAll(@Query('category') category?: string) {
    return this.restaurantService.findAll(category);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const restaurant = await this.restaurantService.findOne(+id);
    if (!restaurant) throw new NotFoundException('Restaurante não encontrado');
    return restaurant;
  }

  @Get(':id/menu')
  async findMenu(@Param('id') id: string) {
    const restaurant = await this.restaurantService.findOne(+id);
    if (!restaurant) throw new NotFoundException('Restaurante não encontrado');
    return this.restaurantService.findMenu(+id);
  }
}

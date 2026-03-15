import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtGuard } from '../auth/jwt.guard';
import type { CreateOrderDto } from './order.service';
import { OrderService } from './order.service';

@Controller('orders')
@UseGuards(JwtGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Req() req: Request, @Body() body: CreateOrderDto) {
    return this.orderService.create((req as any).user.id, body);
  }

  @Get()
  list(@Req() req: Request) {
    return this.orderService.list((req as any).user.id);
  }

  @Get(':id')
  findOne(@Req() req: Request, @Param('id') id: string) {
    return this.orderService.findOne((req as any).user.id, +id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtGuard } from '../auth/jwt.guard';
import { AddressService } from './address.service';
import type { CreateAddressDto } from './address.service';

@Controller('addresses')
@UseGuards(JwtGuard)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  list(@Req() req: Request) {
    return this.addressService.list((req as any).user.id);
  }

  @Post()
  create(@Req() req: Request, @Body() body: CreateAddressDto) {
    return this.addressService.create((req as any).user.id, body);
  }

  @Patch(':id/default')
  setDefault(@Req() req: Request, @Param('id') id: string) {
    return this.addressService.setDefault((req as any).user.id, id);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.addressService.remove((req as any).user.id, id);
  }
}

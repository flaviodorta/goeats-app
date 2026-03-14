import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    RestaurantModule,
    AuthModule,
    AddressModule,
  ],
})
export class AppModule {}

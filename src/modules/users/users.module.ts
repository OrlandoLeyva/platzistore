import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders/orders.controller';
import { UsersController } from './controllers/users/users.controller';
import { forwardRef } from '@nestjs/common';

import { ProductsModule } from '../products/products.module';
import { UsersService } from './services/users/users.service';
import { OrdersService } from './services/orders/orders.service';

@Module({
  imports: [ProductsModule],
  providers: [UsersService, OrdersService],
  controllers: [UsersController, OrdersController],
})
export class UsersModule {}

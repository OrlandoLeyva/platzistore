import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders/orders.controller';
import { UsersController } from './controllers/users/users.controller';

import { UsersService } from './services/users/users.service';

import { ProductsModule } from '../products/products.module';
import { OrdersService } from './services/orders/orders.service';

@Module({
  imports: [ProductsModule],
  providers: [UsersService, OrdersService],
  controllers: [UsersController, OrdersController],
})
export class UsersModule {}

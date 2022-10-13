import { Module } from '@nestjs/common';

import { OrdersController } from './controllers/orders/orders.controller';
import { UsersController } from './controllers/users/users.controller';
import { ProductsModule } from '../products/products.module';
import { UsersService } from './services/users/users.service';
import { OrdersService } from './services/orders/orders.service';
import { Customer } from './entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([Customer, User])],
  providers: [UsersService, OrdersService],
  controllers: [UsersController, OrdersController],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products/products.controller';
import { UsersController } from './controllers/users/users.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { CustomersController } from './controllers/customers/customers.controller';
import { BrandsController } from './controllers/brands/brands.controller';
import { ProductsService } from './services/products/products.service';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [],
  providers: [AppService, ProductsService, UsersService],
  controllers: [
    ProductsController,
    UsersController,
    CategoriesController,
    OrdersController,
    CustomersController,
    BrandsController,
  ],
})
export class AppModule {}

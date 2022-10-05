import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './modules/products/controllers/products/products.controller';
import { UsersController } from './modules/users/controllers/users/users.controller';
import { CategoriesController } from './modules/products/controllers/categories/categories.controller';
import { OrdersController } from './modules/users/controllers/orders/orders.controller';
import { CustomersController } from './modules/users/controllers/customers/customers.controller';
import { BrandsController } from './modules/products/controllers/brands/brands.controller';
import { ProductsService } from './modules/products/services/products/products.service';
import { UsersService } from './modules/users/services/users/users.service';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [ProductsModule],
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

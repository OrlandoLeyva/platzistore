import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [ProductsModule, UsersModule],
  // providers: [AppService, ProductsService, UsersService],
  providers: [AppService],
  controllers: [
    // UsersController,
    // CategoriesController,
    // OrdersController,
    // CustomersController,
    // BrandsController,
    AppController,
  ],
})
export class AppModule {}

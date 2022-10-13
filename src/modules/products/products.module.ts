import { Module } from '@nestjs/common';

import { ProductsController } from './controllers/products/products.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { ProductsService } from './services/products/products.service';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}

import { Module } from '@nestjs/common';

import { ProductsController } from './controllers/products/products.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { ProductsService } from './services/products/products.service';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { BrandsService } from './services/brands/brands.service';
import { BrandsController } from './controllers/brands/brands.controller';
import { Category } from './entities/category.entity';
import { CategoriesService } from './services/categories/categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand, Category])],
  controllers: [ProductsController, BrandsController, CategoriesController],
  providers: [ProductsService, BrandsService, CategoriesService],
  exports: [ProductsService, TypeOrmModule],
})
export class ProductsModule {}

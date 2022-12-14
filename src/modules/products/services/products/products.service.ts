import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/modules/database/services/database.service';
import {
  FilterOptions,
  ProductDto,
  UpdateProductDto,
} from 'src/modules/products/DTOs/products.dto';
import { responses } from 'src/utils/response.handler';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, FindOptionsWhere } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { BrandsService } from '../brands/brands.service';
import { Category } from '../../entities/category.entity';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    private databaseService: DatabaseService,
    private brandsService: BrandsService,
    private categoriesService: CategoriesService,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(data: ProductDto) {
    try {
      const brand = await this.brandsService.findById(data.brandId);
      const categories = await this.categoriesService.findByIds(
        data.categoriesIds,
      );

      const newProduct = this.productRepo.create(data);
      newProduct.brand = brand;
      newProduct.categories = categories;
      await this.productRepo.save(newProduct);
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  async findAll(paginationOptions?: FilterOptions) {
    try {
      if (paginationOptions) {
        const { offset, limit, maxPrice } = paginationOptions;
        const where: FindOptionsWhere<Product> = {};
        if (maxPrice) where.price = LessThanOrEqual(maxPrice);
        const products = await this.productRepo.find({
          take: limit,
          skip: offset,
          where,
        });
        return products;
      }
      const products = await this.productRepo.find();
      return products;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: number) {
    try {
      const product = await this.productRepo.findOne({
        where: { id },
        relations: ['brand', 'categories'],
      });
      if (!product)
        throw new HttpException(
          responses.error(404, 'Product not found'),
          HttpStatus.NOT_FOUND,
        );
      return product;
    } catch (error) {
      throw error;
    }
  }

  async filterById(productsId: number[]): Promise<Product[]> {
    try {
      const products: Product[] = [];
      for (const id of productsId) {
        try {
          const product = await this.findById(id);
          products.push(product);
        } catch (error) {
          throw error;
        }
      }

      return products;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, changes: UpdateProductDto) {
    try {
      const product = await this.findById(id);
      this.productRepo.merge(product, changes);
      await this.productRepo.save(product);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async removeCategory(productId: number, categoryId: number) {
    try {
      const product = await this.findById(productId);
      const categoryIndex = product.categories.findIndex(
        (category) => category.id === categoryId,
      );
      product.categories.splice(categoryIndex, 1);
      await this.productRepo.save(product);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.findById(id);
      this.productRepo.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

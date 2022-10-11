import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/modules/database/services/database.service';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/modules/products/DTOs/products.dto';
import { responses } from 'src/utils/response.handler';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    private databaseService: DatabaseService,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(payload: CreateProductDto): Promise<Product> {
    try {
      const newProduct = this.productRepo.create(payload);
      await this.productRepo.save(newProduct);
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const products = await this.productRepo.find();
      return products;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: number): Promise<Product> {
    try {
      const product = await this.productRepo.findOneBy({ id });
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

  async update(id: number, changes: UpdateProductDto): Promise<Product> {
    try {
      const product = await this.findById(id);
      this.productRepo.merge(product, changes);
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

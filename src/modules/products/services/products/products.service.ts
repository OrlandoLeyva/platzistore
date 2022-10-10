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

  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'bla bla',
      price: 122,
      image: '',
      stock: 12,
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'bla bla',
      price: 123,
      image: '',
      stock: 10,
    },
  ];

  async findWithRepo() {
    const products = await this.productRepo.find();
    return products;
  }

  create(payload: CreateProductDto): Product {
    const product: Product = {
      id: Math.floor(Math.random() * (1000 - 1) + 1),
      ...payload,
    };
    this.products.push(product);
    return product;
  }

  findAll() {
    return this.products;
  }

  findOne(id: number): Product {
    const product: Product | undefined = this.products.find(
      (product) => product.id === id,
    );

    if (!product)
      throw new HttpException(
        responses.error(404, `Product ${id} not found`),
        HttpStatus.NOT_FOUND,
      );

    return product;
  }

  filterById(productsId: number[]): Product[] {
    try {
      const products: Product[] = [];
      for (const id of productsId) {
        try {
          const product = this.findOne(id);
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

  update(id: number, payload: UpdateProductDto): Product {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex === -1)
      throw new HttpException(
        responses.error(404, 'Product Not Found'),
        HttpStatus.NOT_FOUND,
      );
    this.products[productIndex] = {
      ...this.products[productIndex],
      ...payload,
    };

    return this.products[productIndex];
  }

  remove(id: number) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex === -1)
      throw new HttpException(
        responses.error(404, 'Product Not Found'),
        HttpStatus.NOT_FOUND,
      );
    this.products.splice(productIndex, 1);
    return this.products[productIndex];
  }
}

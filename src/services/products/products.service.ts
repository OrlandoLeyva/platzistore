import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateProductDto,
  Product,
  UpdateProductDto,
} from 'src/schemas/products.schema';
import { responses } from 'src/utils/response.handler';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: Math.floor(Math.random() * (1000 - 1) + 1),
      name: 'Product 1',
      description: 'bla bla',
      price: 122,
      image: '',
      stock: 12,
    },
    {
      id: Math.floor(Math.random() * (1000 - 1) + 1),
      name: 'Product 2',
      description: 'bla bla',
      price: 123,
      image: '',
      stock: 10,
    },
  ];

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
    const product: Product = this.products.find((product) => product.id === id);

    if (!product)
      throw new HttpException(
        responses.error(404, 'NotFound'),
        HttpStatus.NOT_FOUND,
      );

    return product;
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

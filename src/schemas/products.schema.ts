import { IsString, IsNumber } from 'class-validator';

// export interface Product {
//   @IsString()
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   stock: number;
// }

//Product dto.

export class Product {
  id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  image: string;

  @IsNumber()
  stock: number;
}

export type CreateProductDto = Omit<Product, 'id'>;

export type UpdateProductDto = Omit<Product, 'id'>;


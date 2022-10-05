import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsInt,
} from 'class-validator';

import { PartialType, OmitType } from '@nestjs/mapped-types';

//Product dto
export class Product {
  @IsNotEmpty()
  @IsString()
  @IsPositive()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsInt()
  stock: number;
}

export class CreateProductDto extends OmitType(Product, ['id']) {}
export class UpdateProductDto extends PartialType(OmitType(Product, ['id'])) {}

// export type CreateProductDto = Readonly<Omit<Product, 'id'>>;

// export type UpdateProductDto = Partial<Omit<Product, 'id'>>;

import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsArray()
  productsId: number[];
}

export class UpdateProductDto extends PartialType(CreateOrderDto) {}

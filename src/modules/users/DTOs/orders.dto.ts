import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';

import { OmitType, PartialType } from '@nestjs/swagger';
import { Purchase } from 'src/interfaces/purchase.interface';

export class OrderDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsInt()
  customerId: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  products: Purchase[];
}

export class createOrderDto extends OmitType(OrderDto, ['products']) {}

export class UpdateOrderDto extends PartialType(OrderDto) {}

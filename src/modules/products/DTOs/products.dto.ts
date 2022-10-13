import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsInt,
} from 'class-validator';

import { PartialType, OmitType, ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  stock: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  brandId: number;
}

export class UpdateProductDto extends PartialType(ProductDto) {}

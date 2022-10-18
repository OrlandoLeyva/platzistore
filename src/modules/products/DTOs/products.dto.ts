import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsInt,
  IsArray,
  ArrayNotEmpty,
  IsOptional,
  Min,
} from 'class-validator';

import { PartialType, ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty()
  @IsNotEmpty({ message: 'categoriesId property should not be empty' })
  @IsArray({ message: 'categoriesId should be an array' })
  @ArrayNotEmpty({
    message: 'categoriesIds should contain at least one categoryId',
  })
  @IsNumber({}, { each: true, message: 'categoryId should be a number' })
  categoriesIds: number[];
}

export class UpdateProductDto extends PartialType(ProductDto) {}

export class FilterOptions {
  @IsNotEmpty()
  @IsOptional()
  @IsInt()
  @IsPositive()
  limit: number;

  @IsNotEmpty()
  @IsOptional()
  @IsInt()
  @Min(0)
  offset: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  maxPrice: number;
}

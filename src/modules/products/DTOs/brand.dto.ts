import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { OneToMany } from 'typeorm';
import { Product } from '../entities/product.entity';

export class BrandDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  image: string;
}

export class UpdateBrandDto extends PartialType(BrandDto) {}

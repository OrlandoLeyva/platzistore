//TODO: CRUD
//Create: DONE.
//Read: DONE.
//Update: DONE.
//Delete: DONE.

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateProductDto,
  Product,
  UpdateProductDto,
} from 'src/modules/products/DTOs/products.dto';

import { ProductsService } from 'src/modules/products/services/products/products.service';
import { responses } from 'src/utils/response.handler';
import { ParseIntPipe } from 'src/common/parse-int.pipe';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  create(@Body() body: CreateProductDto) {
    try {
      const newProduct = this.productsService.create(body);
      return responses.success(201, 'Created', newProduct);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  getAll() {
    try {
      const products = this.productsService.findAll();
      return responses.success(200, 'OK', products);
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  //ParseIntPipe: will validate if the param if a number, not type number, just a number and then if it is, will convert it into a type number. It doesn't accept decimals. MY pipe does accept decimals.
  getOne(@Param('id', ParseIntPipe) productId: number) {
    try {
      const product: Product = this.productsService.findOne(productId);
      return responses.success(200, 'OK', product);
    } catch (error) {
      throw error;
    }
  }

  @Patch('/:id')
  update(
    @Param('id', ParseIntPipe) productId: number,
    @Body() changes: UpdateProductDto,
  ) {
    try {
      const updatedProduct = this.productsService.update(productId, changes);
      return responses.success(201, 'Created', updatedProduct);
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:id')
  remove(@Param('id', ParseIntPipe) productId: number) {
    try {
      this.productsService.remove(productId);
      return responses.success(200, 'OK', null);
    } catch (error) {
      throw error;
    }
  }
}

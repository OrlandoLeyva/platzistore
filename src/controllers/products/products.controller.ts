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
  UpdateProductDto,
} from 'src/schemas/products.schema';

import { ProductsService } from 'src/services/products/products.service';
import { responses } from 'src/utils/response.handler';
import { ParseIntPipe } from 'src/common/parse-int.pipe';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  //Get all the products.
  @Get()
  getAll() {
    try {
      const products = this.productsService.findAll();
      return {
        statusCode: '200',
        message: 'OK',
        data: products,
      };
    } catch (error) {
      throw error;
    }
  }

  //Get a single products.
  @Get('/:id')
  //ParseIntPipe: will validate if the param if a number, not type number, just a number and then if it is, will convert it into a type number. I doesn't accept decimals.
  getOne(@Param('id', ParseIntPipe) productId: number) {
    try {
      const product: object = this.productsService.findOne(productId);
      return responses.success(200, 'OK', product);
    } catch (error) {
      throw error;
    }
  }

  @Post()
  create(@Body() body: CreateProductDto) {
    try {
      const newProduct = this.productsService.create(body);
      return responses.success(201, 'Created', newProduct);
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
  remove(@Param('id', ParseIntPipe) productId: any) {
    try {
      const deletedProduct = this.productsService.remove(productId);
      return responses.success(200, 'OK', deletedProduct);
    } catch (error) {
      throw error;
    }
  }
}

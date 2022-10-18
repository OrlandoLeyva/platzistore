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
  Query,
} from '@nestjs/common';
import {
  FilterOptions,
  ProductDto,
  UpdateProductDto,
} from 'src/modules/products/DTOs/products.dto';

import { ProductsService } from 'src/modules/products/services/products/products.service';
import { responses } from 'src/utils/response.handler';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { ApiTags, ApiParam, ApiOperation } from '@nestjs/swagger';

export interface PaginationOptions {
  offset: number | undefined;
  limit: number | undefined;
}

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiOperation({ summary: 'Add a new product' })
  @Post()
  async create(@Body() body: ProductDto) {
    try {
      const newProduct = await this.productsService.create(body);
      return responses.success(201, 'Created', newProduct);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getAll(
    // @Query('limit', ParseIntPipe) limit = 100,
    // @Query('offset', ParseIntPipe) offset = 0,
    @Query() query: FilterOptions,
  ) {
    try {
      const products = await this.productsService.findAll(query);
      return responses.success(200, 'OK', products);
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  //ParseIntPipe: will validate if the param if a number, not type number, just a number and then if it is, will convert it into a type number. It doesn't accept decimals. MY pipe does accept decimals.
  async getOne(@Param('id', ParseIntPipe) productId: number) {
    try {
      const product = await this.productsService.findById(productId);
      return responses.success(200, 'OK', product);
    } catch (error) {
      throw error;
    }
  }

  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) productId: number,
    @Body() changes: UpdateProductDto,
  ) {
    try {
      const updatedProduct = await this.productsService.update(
        productId,
        changes,
      );
      return responses.success(201, 'Created', updatedProduct);
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:id')
  async remove(@Param('id', ParseIntPipe) productId: number) {
    try {
      await this.productsService.remove(productId);
      return responses.success(200, 'OK', null);
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:productId/categories/:categoryId')
  async deleteCategory(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    try {
      await this.productsService.removeCategory(productId, categoryId);
      return responses.success(204, 'Deleted successfully', null);
    } catch (error) {
      throw error;
    }
  }
}

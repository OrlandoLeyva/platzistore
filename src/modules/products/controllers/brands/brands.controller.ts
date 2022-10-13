import { Body, Controller, Post } from '@nestjs/common';
import { responses } from 'src/utils/response.handler';
import { BrandDto } from '../../DTOs/brand.dto';
import { BrandsService } from '../../services/brands/brands.service';

@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}
  @Post()
  async create(@Body() brand: BrandDto) {
    try {
      const newBrand = await this.brandService.create(brand);
      return responses.success(201, 'Created', newBrand);
    } catch (error) {
      throw error;
    }
  }
}

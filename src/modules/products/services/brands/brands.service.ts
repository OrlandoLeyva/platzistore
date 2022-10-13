import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { responses } from 'src/utils/response.handler';
import { Repository } from 'typeorm';
import { BrandDto } from '../../DTOs/brand.dto';
import { Brand } from '../../entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}
  async create(brand: BrandDto) {
    try {
      const newBrand = this.brandRepo.create(brand);
      await this.brandRepo.save(newBrand);
      return newBrand;
    } catch (error) {}
  }

  async findById(id: number) {
    try {
      const brand = await this.brandRepo.findOneBy({ id });
      if (!brand)
        throw new HttpException(
          responses.error(404, 'Brand not found'),
          HttpStatus.NOT_FOUND,
        );

      return brand;
    } catch (error) {
      throw error;
    }
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { responses } from 'src/utils/response.handler';
import { Repository } from 'typeorm';
import { CategoryDto } from '../../DTOs/category.dto';
import { Category } from '../../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async create(categoryData: CategoryDto) {
    try {
      const newCategory = this.categoryRepo.create(categoryData);
      await this.categoryRepo.save(newCategory);
      return newCategory;
    } catch (error) {
      throw error;
    }
  }

  async findByIds(ids: number[]) {
    try {
      const categories: Category[] = [];
      for (const categoryId of ids) {
        const category = await this.categoryRepo.findOneBy({ id: categoryId });
        if (!category)
          throw new HttpException(
            responses.error(404, `category ${categoryId} was not found`),
            HttpStatus.NOT_FOUND,
          );
        categories.push(category);
      }
      return categories;
    } catch (error) {
      throw error;
    }
  }
}

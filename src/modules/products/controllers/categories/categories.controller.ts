import { Body, Controller, Post } from '@nestjs/common';
import { responses } from 'src/utils/response.handler';
import { CategoryDto } from '../../DTOs/category.dto';
import { CategoriesService } from '../../services/categories/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
  @Post()
  async create(@Body() categoryData: CategoryDto) {
    try {
      const newCategory = await this.categoriesService.create(categoryData);
      return responses.success(401, 'Created', newCategory);
    } catch (error) {
      throw error;
    }
  }
}

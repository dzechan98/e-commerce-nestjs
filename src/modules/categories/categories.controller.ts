import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CategoriesService } from 'src/modules/categories/categories.service';
import {
  CategoryDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/dto/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string) {
    const category = await this.categoriesService.getCategoryById(id);
    return plainToInstance(CategoryDto, category, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  async createCategory(@Body() body: CreateCategoryDto) {
    const category = await this.categoriesService.createCategory(body);
    return plainToInstance(CategoryDto, category, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() body: UpdateCategoryDto,
  ) {
    console.log(body);
    const category = await this.categoriesService.updateCategory(id, body);
    return plainToInstance(CategoryDto, category, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    const category = await this.categoriesService.deleteCategory(id);
    return plainToInstance(CategoryDto, category, {
      excludeExtraneousValues: true,
    });
  }
}

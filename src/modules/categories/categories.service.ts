import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dto/category.dto';
import { CategoryEntity } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import slugify from 'slugify';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async createCategory(
    categoryData: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    const existingCategory = await this.categoryRepository.findOne({
      where: { name: categoryData.name },
    });

    const slug = slugify(categoryData.name, { lower: true });

    if (existingCategory) {
      throw new BadRequestException('Category already exists');
    }

    const category = this.categoryRepository.create({
      ...categoryData,
      slug,
    });
    return this.categoryRepository.save(category);
  }

  async updateCategory(
    id: string,
    categoryData: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    const existingCategory = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!existingCategory) {
      throw new BadRequestException('Category not found');
    }

    if (categoryData.name && categoryData.name !== existingCategory.name) {
      const nameExists = await this.categoryRepository.findOne({
        where: { name: categoryData.name },
      });

      if (nameExists) {
        throw new BadRequestException('Category name already exists');
      }
    }

    const slug = slugify(categoryData.name, { lower: true });

    await this.categoryRepository.update(id, {
      ...categoryData,
      slug,
    });

    return this.categoryRepository.findOne({ where: { id } });
  }

  async getCategoryById(id: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return category;
  }

  async getAllCategories(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find();
  }

  async deleteCategory(id: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    await this.categoryRepository.delete(id);
    return category;
  }
}

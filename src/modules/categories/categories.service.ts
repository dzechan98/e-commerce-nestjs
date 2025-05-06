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

  async createCategory(categoryData: CreateCategoryDto) {
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
    await this.categoryRepository.save(category);

    return {
      message: 'Category created successfully',
      statusCode: 201,
    };
  }

  async updateCategory(id: string, categoryData: UpdateCategoryDto) {
    const existingCategory = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!existingCategory) {
      throw new NotFoundException('Category not found');
    }

    if (categoryData.name && categoryData.name !== existingCategory.name) {
      const nameExists = await this.categoryRepository.findOne({
        where: { name: categoryData.name },
      });

      if (nameExists) {
        throw new BadRequestException('Category name already exists');
      }
    }

    const slug = slugify(categoryData?.name ?? existingCategory.slug, {
      lower: true,
    });

    Object.assign(existingCategory, { slug, ...categoryData });
    await this.categoryRepository.save(existingCategory);
    return {
      message: 'Category updated successfully',
      statusCode: 200,
    };
  }

  async deleteCategory(id: string) {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    await this.categoryRepository.delete(id);
    return {
      message: 'Category deleted successfully',
      statusCode: 200,
    };
  }
}

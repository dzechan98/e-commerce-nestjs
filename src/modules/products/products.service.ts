import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto, UpdateProductDto } from 'src/dto/product.dto';
import { CategoryEntity } from 'src/entities/category.entity';
import { ProductEntity } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getAllProducts(): Promise<ProductEntity[]> {
    return this.productsRepository.find({
      relations: ['category'],
    });
  }

  async getProductById(id: string): Promise<ProductEntity> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);
    return product;
  }

  async createProduct(createData: CreateProductDto) {
    const category = await this.categoryRepository.findOne({
      where: { id: createData.category },
    });
    if (!category) throw new NotFoundException('Category not found');

    const product = this.productsRepository.create({ ...createData, category });
    await this.productsRepository.save(product);
    return {
      message: 'Product created successfully',
      statusCode: 201,
    };
  }

  async updateProduct(id: string, updateData: UpdateProductDto) {
    const product = await this.productsRepository.findOne({
      where: { id },
    });
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    if (updateData.category) {
      const category = await this.categoryRepository.findOne({
        where: { id: updateData.category },
      });
      if (!category) throw new BadRequestException('Category not found');
      product.category = category;
    }

    Object.assign(product, updateData);
    await this.productsRepository.save(product);
    return {
      message: 'Product updated successfully',
      statusCode: 200,
    };
  }

  async deleteProduct(id: string) {
    const product = await this.productsRepository.findOne({
      where: { id },
    });
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    await this.productsRepository.remove(product);
    return {
      message: 'Product deleted successfully',
      statusCode: 200,
    };
  }
}

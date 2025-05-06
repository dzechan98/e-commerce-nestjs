import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/dto/product.dto';
import { CategoryEntity } from 'src/entities/category.entity';
import { ProductEntity } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: Repository<ProductEntity>,
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async createProduct(createData: CreateProductDto): Promise<ProductEntity> {
    const category = await this.categoryRepository.findOne({
      where: { id: createData.category },
    });
    if (!category) throw new BadRequestException('Category not found');

    const product = this.productsRepository.create({ ...createData, category });
    return this.productsRepository.save(product);
  }

  async updateProduct(
    id: string,
    updateData: UpdateProductDto,
  ): Promise<ProductEntity> {
    const product = await this.productsRepository.findOne({
      where: { id },
    });
    if (!product) throw new BadRequestException('Product not found');

    if (updateData.category) {
      const category = await this.categoryRepository.findOne({
        where: { id: updateData.category },
      });
      if (!category) throw new BadRequestException('Category not found');
      product.category = category;
    }

    Object.assign(product, updateData);
    return this.productsRepository.save(product);
  }
}

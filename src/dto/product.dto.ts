import { PartialType } from '@nestjs/mapped-types';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';
import { CategoryDto } from 'src/dto/category.dto';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsUUID()
  category: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsUrl()
  photoURL: string;

  @IsArray()
  @IsUrl({}, { each: true })
  listPhotos: string[];
}

export class ProductDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  @Type(() => CategoryDto)
  category: CategoryDto;

  @Expose()
  price: number;

  @Expose()
  sold: number;

  @Expose()
  quantity: number;

  @Expose()
  photoURL: string;

  @Expose()
  listPhotos: string[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

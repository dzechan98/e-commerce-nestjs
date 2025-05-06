import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  category: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  photoURL: string;

  @ApiProperty()
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

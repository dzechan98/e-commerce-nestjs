import { PartialType } from '@nestjs/mapped-types';
import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase().trim())
  name: string;

  @IsNotEmpty()
  @IsUrl()
  photoURL: string;
}

export class CategoryDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  photoURL: string;

  @Expose()
  slug: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

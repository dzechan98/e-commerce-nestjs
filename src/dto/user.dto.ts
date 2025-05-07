import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Gender } from 'src/types/gender';

export class LoginUserDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'strongpassword123' })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}

export class SignUpDto extends LoginUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateUserDto extends PartialType(SignUpDto) {
  @ApiPropertyOptional({ example: '+84123456789' })
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.png' })
  @IsOptional()
  @IsString()
  photoURL?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;

  @ApiProperty({ enum: Gender, example: Gender.MALE })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({ example: '1990-01-01' })
  @IsOptional()
  @IsDateString()
  dob?: Date;
}

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  photoURL: string;

  @Expose()
  isAdmin: boolean;

  @Expose()
  gender: string;

  @Expose()
  dob: Date;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

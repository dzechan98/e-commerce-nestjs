import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from 'src/dto/user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(signUpDto: SignUpDto) {
    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
    const newUser = this.userRepository.create({
      ...signUpDto,
      password: hashedPassword,
    });

    try {
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user');
    }
  }
}

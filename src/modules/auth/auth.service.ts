import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto, SignUpDto } from 'src/dto/user.dto';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async generateToken(user: { id: string }) {
    const payload = { sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async login(loginDto: LoginUserDto) {
    const user = await this.usersService.findOneByEmail(loginDto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return this.generateToken({ id: user.id });
  }

  async register(signUpDto: SignUpDto) {
    const user = await this.usersService.findOneByEmail(signUpDto.email);
    if (user) {
      throw new ConflictException('Email is already registered');
    }

    const newUser = await this.usersService.createUser(signUpDto);
    return this.generateToken({ id: newUser.id });
  }
}

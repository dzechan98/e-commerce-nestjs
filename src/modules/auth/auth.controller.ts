import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LoginUserDto, SignUpDto, UserDto } from 'src/dto/user.dto';
import { plainToInstance } from 'class-transformer';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @Post('register')
  async register(@Body() userDto: SignUpDto) {
    return this.authService.register(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return plainToInstance(UserDto, req.user, {
      excludeExtraneousValues: true,
    });
  }
}

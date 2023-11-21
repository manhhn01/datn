import { AuthService } from '@modules/auth/auth.service';
import { LoginDto } from '@modules/auth/dtos/login.dto';
import { RegisterDto } from '@modules/auth/dtos/register.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}

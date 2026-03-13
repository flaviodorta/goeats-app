import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';

interface RegisterDto {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface LoginDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(
      body.name,
      body.email,
      body.password,
      body.phone,
    );
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }
}

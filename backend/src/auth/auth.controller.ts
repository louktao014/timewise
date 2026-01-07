import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() { email, password }) {
    return this.authService.register(email, password);
  }

  @Post('login')
  async login(@Body() { email, password }) {
    return this.authService.login(email, password);
  }

  @Get('user')
  async getUser(@Query('email') email) {
    return this.authService.getUser(email);
  }
}

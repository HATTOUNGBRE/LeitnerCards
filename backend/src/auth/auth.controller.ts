import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { AuthService } from './auth.service';

class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto): Promise<{ access_token: string }> {
    return this.authService.login(dto.email, dto.password);
  }
}
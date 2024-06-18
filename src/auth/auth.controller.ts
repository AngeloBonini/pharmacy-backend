import { Controller, Body, Post } from '@nestjs/common';
import { AuthRoutePaths } from './auth.routepaths';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

@Controller(AuthRoutePaths.ROOT)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(AuthRoutePaths.LOGIN)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}

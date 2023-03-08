import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './shared/guard/auth/local-auth.guard';
import { AuthService } from './shared/guard/auth/service/auth.service';
import { JwtAuthGuard } from './shared/guard/auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private authService:AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
}

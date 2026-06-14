import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @AllowAnonymous()
  home() {
    return this.appService.home();
  }

  @Get('health')
  @AllowAnonymous()
  getHealth() {
    return this.appService.getHealth();
  }
}

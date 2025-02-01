import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// This controller is responsible for handling incoming requests
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

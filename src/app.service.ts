import { Injectable } from '@nestjs/common';
// This decorator marks a class as a provider
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

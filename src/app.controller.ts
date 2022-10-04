import { Controller, Get } from '@nestjs/common';
// import { get } from 'http';
import { AppService } from './app.service';

@Controller('platzistore')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/')
  api() {
    return 'platzistore';
  }
}

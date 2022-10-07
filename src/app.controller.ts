import { Controller, Get, Inject } from '@nestjs/common';
// import { get } from 'http';
import { AppService } from './app.service';

@Controller('platzistore')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
  ) {}
  @Get('/')
  api() {
    return 'platzistore';
  }

  @Get('/apiKey')
  getKey() {
    return `API Key: ${this.apiKey}`;
  }

  @Get('/tasks')
  getTasks() {
    return this.tasks;
  }
}

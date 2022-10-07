import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
//The firstValueFrom will resolve a Promise with the first value that was emitted from the Observable and will immediately unsubscribe to retain resources
import { firstValueFrom } from 'rxjs';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './modules/database/database.module';
import { environment } from './environment';
import config from './config';

const API_KEY = '123-x$%dy-34$%ds-sfs?f$?¡sa';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    HttpModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: environment[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('prod', 'stag', 'dev').optional(),
        DATABASE_NAME: Joi.string().required(),
        API_KEY: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
    }),
  ],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useValue: API_KEY,
    },
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const tasks = await firstValueFrom(
          http.get('https://jsonplaceholder.typicode.com/todos'),
        );

        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
  controllers: [AppController],
})
export class AppModule {}

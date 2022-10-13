import { Module, Global } from '@nestjs/common';
import { DatabaseService } from './services/database.service';
import { Client } from 'pg';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { host, port, name, username, password } = configService.database;
        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database: name,
          synchronize: false,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  providers: [
    DatabaseService,
    {
      provide: 'DB',
      useFactory: (configService: ConfigType<typeof config>) => {
        const client = new Client({
          database: configService.database.name,
          host: configService.database.host,
          port: configService.database.port,
          user: configService.database.username,
          password: configService.database.password,
        });

        client.connect((error) => {
          if (error) {
            console.log('[DB connection error]', error);
            process.exit(-1);
          }
        });

        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: [DatabaseService, 'DB', TypeOrmModule],
})
export class DatabaseModule {}

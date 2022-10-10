import { Injectable } from '@nestjs/common';
import { Client, ClientConfig } from 'pg';

@Injectable()
export class DatabaseService {
  private client: Client;
  private clientCredentials: ClientConfig = {
    database: 'platzistore',
    port: 5432,
    user: 'postgres_admin',
    password: '12ps34ql',
  };
  constructor() {
    // this.client = new Client(this.clientCredentials);
    // this.client.connect((error) => {
    //   if (error) {
    //     console.log('[DB connection error]', error);
    //     process.exit(-1);
    //   }
    //   console.log('Successful DB connection');
    // });
  }

  // insert() {}
  // findAll() {}
  // findOne() {}
  // filter() {}
  // update() {}
  // delete() {}
}

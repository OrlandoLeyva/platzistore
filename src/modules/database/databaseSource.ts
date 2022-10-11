import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres_admin',
  password: '12ps34ql',
  database: 'platzistore',
  logging: true,
  synchronize: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/modules/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
});

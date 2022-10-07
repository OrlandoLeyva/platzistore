import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
      password: process.env.DATABASE_PASSWORD,
      username: process.env.DATABASE_username,
    },
  };
});

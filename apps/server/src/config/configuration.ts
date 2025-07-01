import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    host: process.env.POSTGRES_HOST || '',
    db: process.env.POSTGRES_DB || '',
    user: process.env.POSTGRES_USER || '',
    password: process.env.POSTGRES_PASSWORD || '',
    ssl: process.env.POSTGRES_SSL ? Boolean(process.env.POSTGRES_SSL) : false,
  },
}));

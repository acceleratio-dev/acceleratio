import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    url: process.env.DATABASE_URL || '',
  },
}));

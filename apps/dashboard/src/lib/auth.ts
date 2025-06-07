import { betterAuth } from 'better-auth';
import { Pool } from 'pg';

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
});

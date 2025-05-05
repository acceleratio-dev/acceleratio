import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
}

export default defineConfig({
    dialect: 'postgresql',
    schema: './src/infrastructure/db/orm/schema',
    out: './migrations',
    dbCredentials: {
        url: process.env.DATABASE_URL,
    }
})

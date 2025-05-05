import { drizzle } from "drizzle-orm/postgres-js";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});


export const db = drizzle(process.env.DATABASE_URL!);
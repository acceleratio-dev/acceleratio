import { pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const projectsTable = pgTable("projects", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
})
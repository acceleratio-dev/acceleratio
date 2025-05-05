import { pgTable, uuid, varchar, timestamp, integer, text, numeric } from "drizzle-orm/pg-core";
import { projectsTable } from "./projects";

export const servicesTable = pgTable('services', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    projectId: uuid('project_id').references(() => projectsTable.id),
    position_x: integer('position_x').notNull().default(0),
    position_y: integer('position_y').notNull().default(0),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

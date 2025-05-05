import { jsonb, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { servicesTable } from "./services";
import { DeploymentStatus } from "@/domain/entities/deployment";


export const deploymentsTable = pgTable('deployments', {
    id: uuid('id').primaryKey().defaultRandom(),
    serviceId: uuid('service_id').references(() => servicesTable.id),
    status: varchar('status').default(DeploymentStatus.DRAFT),
    taskId: varchar('task_id'),
    taskStatus: varchar('task_status'),
    name: varchar('name'),
    config: jsonb('config'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
})
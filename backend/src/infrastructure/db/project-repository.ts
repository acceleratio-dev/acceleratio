import type { IProjectRepository } from "@/domain/repositories/IProjectRepository";
import { db } from "./orm/client";
import { projectsTable } from "./orm/schema/projects";
import { eq, count, sql } from "drizzle-orm";
import type { DeleteProjectDTO } from "@/application/dto/project/delete-project-dto";

export class ProjectRepository implements IProjectRepository {
    async getProjects() {
        const projects = await db
            .select()
            .from(projectsTable);
        return projects;
    }

    async createProject(payload: typeof projectsTable.$inferInsert) {
        const [project] = await db.insert(projectsTable).values(payload).returning();
        return project;
    }

    async getProjectById(id: string) {
        const [project] = await db.select().from(projectsTable).where(eq(projectsTable.id, id));
        return project;
    }

    async deleteProject(payload: DeleteProjectDTO) {
        const deleted = await db.delete(projectsTable).where(eq(projectsTable.id, payload.id)).returning();
        return deleted[0].id;
    }
}

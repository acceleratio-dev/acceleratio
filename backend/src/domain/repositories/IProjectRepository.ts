import type { CreateProjectDTO } from "@/application/dto/project/create-project-dto";
import type { DeleteProjectDTO } from "@/application/dto/project/delete-project-dto";
import type { projectsTable } from "@/infrastructure/db/drizzle/schema/projects";

export interface IProjectRepository {
    getProjects(): Promise<(typeof projectsTable.$inferSelect)[]>
    getProjectById(id: string): Promise<typeof projectsTable.$inferSelect>
    createProject(payload: CreateProjectDTO): Promise<typeof projectsTable.$inferSelect>
    deleteProject(payload: DeleteProjectDTO): Promise<typeof projectsTable.$inferSelect.id>
}
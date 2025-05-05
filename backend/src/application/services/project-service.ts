import type { IProjectRepository } from "@/domain/repositories/IProjectRepository";
import { ProjectRepository } from "@/infrastructure/db/project-repository";
import type { CreateProjectDTO } from "@/application/dto/project/create-project-dto";
import type { DeleteProjectDTO } from "@/application/dto/project/delete-project-dto";

export class ProjectService {
    private static repository: IProjectRepository = new ProjectRepository()

    static async getAll() {
        return this.repository.getProjects();
    }

    static async getById(id: string) {
        return this.repository.getProjectById(id);
    }

    static async create(payload: CreateProjectDTO) {
        return this.repository.createProject(payload);
    }

    static async delete(payload: DeleteProjectDTO) {
        return this.repository.deleteProject(payload);
    }
}
import { api } from "../index";
import { Project, ServerResponse } from "../types";

export const projectsApi = {
    getProjects: async (): Promise<ServerResponse<Project[]>> => {
        return api.get('/projects');
    },
    getProjectById: async (id: Project['id']): Promise<ServerResponse<Project>> => {
        return api.get(`/projects/${id}`);
    },
    createProject: async (name: Project['name']): Promise<ServerResponse<Project>> => {
        return api.post('/projects', { name });
    },
    deleteProject: async (id: Project['id']): Promise<ServerResponse<Project["id"]>> => {
        return api.delete(`/projects/${id}`);
    }
}
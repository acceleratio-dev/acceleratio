import { api } from "../index";
import { Project, ServerResponse } from "../types";

const baseUrl = "/projects";

export const projectsApi = {
    getProjects: async (): Promise<ServerResponse<Project[]>> => {
        return api.get(baseUrl);
    },
    getProjectById: async (id: Project['id']): Promise<ServerResponse<Project>> => {
        return api.get(`${baseUrl}/${id}`);
    },
    createProject: async (name: Project['name']): Promise<ServerResponse<Project>> => {
        return api.post(baseUrl, { name });
    },
    deleteProject: async (id: Project['id']): Promise<ServerResponse<Project["id"]>> => {
        return api.delete(`${baseUrl}/${id}`);
    }
}
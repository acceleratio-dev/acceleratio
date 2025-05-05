import { projectsApi } from "@/api/projects";
import { Project } from "@/api/types";
import { createEffect, createEvent, createStore } from "effector";
import { toast } from "sonner";

export const $projects = createStore<Project[]>([]);

export const fetchProjectsFx = createEffect(projectsApi.getProjects)
$projects.on(fetchProjectsFx.doneData, (_, { data }) => {
    if (data.success) {
        return data.data
    }
    return []
})

export const addProject = createEvent<Project>()
$projects.on(addProject, (state, project) => {
    return [...state, project]
})

export const clearProjects = createEvent()
$projects.on(clearProjects, () => {
    return []
})

export const deleteProjectFx = createEffect(projectsApi.deleteProject)
$projects.on(deleteProjectFx.doneData, (state, { data }) => {
    if (data.success) {
        toast.success("Project deleted successfully")
        return state.filter(project => project.id !== data.data)
    }
    toast.error("Failed to delete project")
    return state
})
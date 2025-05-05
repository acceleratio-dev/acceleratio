import { ProjectService } from "@/application/services/project-service";
import { formatResponse } from "@/shared/utils/format-response";
import { AppErrors } from "@/shared/errors/app-errors";
import type { Context } from "hono";
import { StatusCodes } from "http-status-codes";
import { createProjectSchema } from "@/application/dto/project/create-project-dto";
import { deleteProjectSchema } from "@/application/dto/project/delete-project-dto";

export class ProjectController {

    async projectsList(c: Context) {
        try {
            const projects = await ProjectService.getAll()
            return c.json(formatResponse(projects));
        } catch (error) {
            return c.json(formatResponse(null, error as Error, AppErrors.INTERNAL_SERVER_ERROR), StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async createProject(c: Context) {
        const payload = await c.req.json()
        const validation = createProjectSchema.safeParse(payload)

        if (!validation.success) {
            return c.json(formatResponse(null, validation.error as Error, AppErrors.VALIDATION_ERROR), StatusCodes.BAD_REQUEST);
        }

        try {
            const project = await ProjectService.create(validation.data)
            return c.json(formatResponse(project));
        } catch (error) {
            return c.json(formatResponse(null, error as Error, AppErrors.INTERNAL_SERVER_ERROR), StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getProjectById(c: Context) {
        try {
            const { id } = c.req.param()
            const project = await ProjectService.getById(id)
            return c.json(formatResponse(project))
        } catch (error) {
            return c.json(formatResponse(null, error as Error, AppErrors.INTERNAL_SERVER_ERROR), StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteProject(c: Context) {
        try {
            const { id } = c.req.param()
            const validation = deleteProjectSchema.safeParse({ id })

            if (!validation.success) {
                return c.json(formatResponse(null, validation.error as Error, AppErrors.VALIDATION_ERROR), StatusCodes.BAD_REQUEST);
            }

            const project = await ProjectService.getById(validation.data.id)

            if (!project) {
                return c.json(formatResponse(null, new Error("Project not found"), AppErrors.NOT_FOUND), StatusCodes.NOT_FOUND);
            }

            const deletedId = await ProjectService.delete(validation.data)
            return c.json(formatResponse(deletedId))
        } catch (error) {
            return c.json(formatResponse(null, error as Error, AppErrors.INTERNAL_SERVER_ERROR), StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}
import type { Context } from "hono";
import { createServiceSchema } from "@/application/dto/service/create-service-dto";
import { formatResponse } from "@/shared/utils/format-response";
import { AppErrors } from "@/shared/errors/app-errors";
import { StatusCodes } from "http-status-codes";
import { ServiceService } from "@/application/services/service-service";
import { logger } from "@/infrastructure/loger";
import { updateServiceMetaSchema } from "@/application/dto/service/update-service-meta-dto";
import { updateServiceConfigSchema } from "@/application/dto/service/update-service-config-dto";

export class ServiceController {

    async createService(c: Context) {
        const payload = await c.req.json()
        const validation = createServiceSchema.safeParse(payload)

        if (!validation.success) {
            return c.json(formatResponse(null, validation.error as Error, AppErrors.VALIDATION_ERROR), StatusCodes.BAD_REQUEST);
        }

        try {
            const service = await ServiceService.createService(validation.data)
            return c.json(formatResponse(service), StatusCodes.CREATED);
        } catch (error) {
            logger.error(error)
            return c.json(formatResponse(null, error as Error, AppErrors.INTERNAL_SERVER_ERROR), StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getServices(c: Context) {
        const projectId = c.req.param('projectId')

        try {
            const services = await ServiceService.getProjectServices(projectId)
            return c.json(formatResponse(services), StatusCodes.OK);
        } catch (error) {
            logger.error(error)
            return c.json(formatResponse(null, error as Error, AppErrors.INTERNAL_SERVER_ERROR), StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async deployService(c: Context) {
        const serviceId = c.req.param('serviceId')

        try {
            const result = await ServiceService.deployService(serviceId)
            return c.json(formatResponse(result), StatusCodes.OK);
        } catch (error) {
            logger.error(error)
            return c.json(formatResponse(null, error as Error, AppErrors.INTERNAL_SERVER_ERROR), StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async updateService(c: Context) {
        const serviceId = c.req.param('serviceId')
        const payload = await c.req.json()
        const validation = updateServiceMetaSchema.safeParse(payload)

        if (!validation.success) {
            return c.json(formatResponse(null, validation.error as Error, AppErrors.VALIDATION_ERROR), StatusCodes.BAD_REQUEST);
        }

        try {
            const service = await ServiceService.updateService(serviceId, validation.data)
            return c.json(formatResponse(service), StatusCodes.OK);
        } catch (error) {
            logger.error(error)
            return c.json(formatResponse(null, error as Error, AppErrors.INTERNAL_SERVER_ERROR), StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async updateServiceConfig(c: Context) {
        const serviceId = c.req.param('serviceId')
        const payload = await c.req.json()
        const validation = updateServiceConfigSchema.safeParse(payload)

        if (!validation.success) {
            return c.json(formatResponse(null, validation.error as Error, AppErrors.VALIDATION_ERROR), StatusCodes.BAD_REQUEST);
        }

        try {
            const service = await ServiceService.updateServiceConfig(serviceId, validation.data)
            return c.json(formatResponse(service), StatusCodes.OK);
        } catch (error) {
            logger.error(error)
            return c.json(formatResponse(null, error as Error, AppErrors.INTERNAL_SERVER_ERROR), StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getDeploymentsHistory(c: Context) {
        const serviceId = c.req.param('serviceId')

        try {
            const deployments = await ServiceService.getDeploymentsHistory(serviceId)
            return c.json(formatResponse(deployments), StatusCodes.OK);
        } catch (error) {
            logger.error(error)
            return c.json(formatResponse(null, error as Error, AppErrors.INTERNAL_SERVER_ERROR), StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}
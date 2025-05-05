import { Hono } from "hono"
import { ServiceController } from "../controllers/service-controller"


export const initServiceRoutes = () => {
    const router = new Hono()
    const controller = new ServiceController()

    router.post("/", controller.createService)
    router.get("/project/:projectId", controller.getServices)
    router.get("/:serviceId/deploy", controller.deployService)
    router.get("/:serviceId/deployments", controller.getDeploymentsHistory)

    router.put("/:serviceId", controller.updateService)
    router.put("/:serviceId/config", controller.updateServiceConfig)

    return router
}
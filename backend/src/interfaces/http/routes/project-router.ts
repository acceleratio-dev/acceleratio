import { Hono } from "hono"
import { ProjectController } from "../controllers/project-controller"


export const initProjectRoutes = () => {
    const router = new Hono()
    const controller = new ProjectController()

    router.get("/", controller.projectsList)
    router.get("/:id", controller.getProjectById)
    router.post("/", controller.createProject)
    router.delete("/:id", controller.deleteProject)

    return router
}
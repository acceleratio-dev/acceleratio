import { Hono } from "hono";
import { logger, loggerMiddleware } from "@/infrastructure/loger";
import { initProjectRoutes } from "@/interfaces/http/routes/project-router";
import { initServiceRoutes } from "@/interfaces/http/routes/service-router";
import { cors } from "hono/cors";
import { createBunWebSocket } from "hono/bun";
import { serviceWebsocket } from "@/interfaces/websocket/service-websocket";
import { initDockerWorker } from "@/infrastructure/docker/worker/init";

export const initServer = () => {
    const app = new Hono().basePath("/api");

    app.use(cors())
    app.use(loggerMiddleware)

    app.route("/projects", initProjectRoutes())
    app.route("/services", initServiceRoutes())

    logger.info("Initializing docker worker...")
    initDockerWorker()

    const { upgradeWebSocket, websocket } = createBunWebSocket()

    app.route("/services", serviceWebsocket(upgradeWebSocket))

    console.log("Available Routes:")
    app.routes.forEach(route => {
        console.log(`${route.method} ${route.path}`);
    });

    return {
        app,
        websocket
    }
}
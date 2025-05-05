import { validateEnv } from "@/infrastructure/config";
import { logger } from "./infrastructure/loger";
import { initServer } from "./infrastructure/server/init-server";
import { serve } from "bun";
import { Scheduler } from "./infrastructure/scheduler";
import { closeAllWebSocketConnections } from "./interfaces/websocket/service-websocket";

async function main() {
    logger.info("Validating environment variables...");
    validateEnv();

    logger.info("Starting scheduler...");
    await Scheduler.start();

    logger.info("Starting server...");

    const { app, websocket } = initServer();

    const server = serve({
        fetch: app.fetch,
        port: 8080,
        websocket: websocket
    });

    // graceful shutdown
    process.on('SIGINT', async () => {
        logger.info('Shutting down gracefully...');
        await Scheduler.stop();
        closeAllWebSocketConnections();
        server.stop();
        process.exit(0);
    });

    process.on('SIGTERM', async () => {
        logger.info('Shutting down gracefully...');
        await Scheduler.stop();
        closeAllWebSocketConnections();
        server.stop();
        process.exit(0);
    });
}

main()


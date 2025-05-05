import type { Context, Next } from "hono"
import pino from "pino"

export const logger = pino({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
})

export const loggerMiddleware = async (c: Context, next: Next) => {
    const now = performance.now()
    await next()
    const duration = performance.now() - now
    logger.debug(`[${c.req.method}] ${c.req.path} - ${duration.toFixed(2)}ms | ${c.res.status}`)
}
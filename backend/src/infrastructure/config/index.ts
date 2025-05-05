import { z } from "zod";
import { logger } from "@/infrastructure/loger";

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production"]),
    PORT: z.string().transform((val) => {
        const num = Number(val);
        if (isNaN(num)) throw new Error("PORT must be a valid number");
        return num;
    }),
    DATABASE_URL: z.string(),
    DOCKER_API_BASE_PATH: z.string(),
    DOCKER_SOCKET_PATH: z.string(),
})

export const validateEnv = () => {
    const env = process.env;
    if (env.NODE_ENV !== "production") {
        logger.info("Running in development mode");
    }

    const parsedEnv = envSchema.safeParse(env);

    if (!parsedEnv.success) {
        logger.error("Invalid environment variables");
        logger.error(parsedEnv.error.format());
        process.exit(1);
    }

    return parsedEnv;
};

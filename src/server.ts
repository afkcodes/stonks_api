import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import Fastify, { type FastifyInstance } from "fastify";
import { config } from "~/config";
import { requestLoggerMiddleware } from "~/middleware/request-logger";
import errorHandler from "~/plugins/error-handler";
import { healthRoutes } from "~/routes/health";
import { stocksRoutes } from "./routes/stocks";

export async function buildServer(): Promise<FastifyInstance> {
  const server = Fastify({
    logger: {
      level: config.logLevel,
      transport:
        config.environment === "development"
          ? {
              target: "pino-pretty",
              options: {
                translateTime: "HH:MM:ss Z",
                ignore: "pid,hostname",
              },
            }
          : undefined,
    },
  });

  // Register plugins
  await server.register(errorHandler);

  // Register swagger
  await server.register(swagger, {
    swagger: {
      info: {
        title: "Stonk API",
        description: "API documentation for the Stonk API",
        version: "1.0.0",
      },
      host: `${config.host}:${config.port}`,
      schemes: ["http", "https"],
      consumes: ["application/json"],
      produces: ["application/json"],
    },
  });

  await server.register(swaggerUi, {
    routePrefix: "/documentation",
  });

  // Register CORS
  await server.register(cors, {
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE"],
  });

  // Apply global middlewares
  server.addHook("onRequest", requestLoggerMiddleware);

  // Register routes
  server.register(healthRoutes, { prefix: "/api" });
  server.register(stocksRoutes, { prefix: "/api/stocks" });

  return server;
}

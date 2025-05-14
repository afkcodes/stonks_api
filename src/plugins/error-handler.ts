import type { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { config } from "~/config";
import { AppError } from "~/utils/errors";

/**
 * Plugin that adds a global error handler to Fastify
 */
export default fp(
  async function errorHandlerPlugin(fastify: FastifyInstance) {
    // Handle errors thrown during request processing
    fastify.setErrorHandler(
      (error: Error | AppError | FastifyError, request: FastifyRequest, reply: FastifyReply) => {
        const isDev = config.environment === "development";

        // Handle our custom AppError instances
        if (error instanceof AppError) {
          const response = {
            error: error.errorCode,
            message: error.message,
            ...(error.errors && { details: error.errors }),
            ...(isDev && { stack: error.stack }),
          };

          return reply.code(error.statusCode).send(response);
        }

        // Handle Fastify validation errors
        if ((error as FastifyError).validation) {
          const validationError = error as FastifyError;
          const response = {
            error: "VALIDATION_ERROR",
            message: "Request validation failed",
            details: validationError.validation,
            ...(isDev && { stack: error.stack }),
          };

          return reply.code(400).send(response);
        }

        // Log unhandled errors
        request.log.error(error);

        // Default error response for unhandled errors
        const response = {
          error: "INTERNAL_SERVER_ERROR",
          message: isDev ? error.message : "An unexpected error occurred",
          ...(isDev && { stack: error.stack }),
        };

        return reply.code(500).send(response);
      },
    );

    // Handle 404 Not Found errors
    fastify.setNotFoundHandler((request: FastifyRequest, reply: FastifyReply) => {
      reply.code(404).send({
        error: "NOT_FOUND",
        message: `Route ${request.method}:${request.url} not found`,
      });
    });
  },
  {
    name: "error-handler",
  },
);

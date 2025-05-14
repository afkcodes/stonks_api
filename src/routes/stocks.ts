import type { FastifyInstance } from "fastify";
import {
  getAutoCompleteService,
  getMarketWatchService,
  getMarqueeStocksService,
  getQuoteEquityService,
} from "~/services/stockService";

export const stocksRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/watch", async (_request, reply) => {
    try {
      const response = await getMarketWatchService();
      return reply.send(response);
    } catch (error) {
      return reply.status(500).send({ error });
    }
  });

  fastify.get("/marquee", async (_request, reply) => {
    try {
      const response = await getMarqueeStocksService();
      return reply.send(response);
    } catch (error) {
      return reply.status(500).send({ error });
    }
  });

  fastify.get("/quote/:symbol", async (request, reply) => {
    const { symbol } = request.params as { symbol: string };
    try {
      const response = await getQuoteEquityService(symbol);
      return reply.send(response);
    } catch (error) {
      return reply.status(500).send({ error });
    }
  });

  fastify.get("/autocomplete/:symbol", async (request, reply) => {
    const { symbol } = request.params as { symbol: string };
    try {
      const response = await getAutoCompleteService(symbol);
      return reply.send(response);
    } catch (error) {
      return reply.status(500).send({ error });
    }
  });
};

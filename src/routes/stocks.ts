import type { FastifyInstance } from "fastify";
import {
  getAutoCompleteController,
  getMarketWatchController,
  getMarqueeStocksController,
  getQuoteEquityController,
} from "~/controllers/stocksController";

export const stocksRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/watch", getMarketWatchController);
  fastify.get("/marquee", getMarqueeStocksController);
  fastify.get("/quote/:symbol", getQuoteEquityController);
  fastify.get("/autocomplete/:symbol", getAutoCompleteController);
};

import type { FastifyInstance } from "fastify";
import {
  getAutoCompleteController,
  getMarketWatchController,
  getMarqueeStocksController,
  getMostActiveEtfController,
  getMostActiveSecuritiesController,
  getMostActiveSmeController,
  getQuoteEquityController,
  getVolumeGainersController,
} from "~/controllers/stocksController";

export const stocksRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/watch", getMarketWatchController);
  fastify.get("/marquee", getMarqueeStocksController);
  fastify.get("/quote/:symbol", getQuoteEquityController);
  fastify.get("/autocomplete/:symbol", getAutoCompleteController);
  fastify.get("/most-active-securities", getMostActiveSecuritiesController);
  fastify.get("/most-active-sme", getMostActiveSmeController);
  fastify.get("/most-active-etf", getMostActiveEtfController);
  fastify.get("/volume-gainers", getVolumeGainersController);
};

import type { FastifyReply, FastifyRequest } from "fastify";
import {
  getAutoCompleteService,
  getMarketWatchService,
  getMarqueeStocksService,
  getQuoteEquityService,
} from "~/services/stockService";

export async function getMarketWatchController(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const response = await getMarketWatchService();
    return reply.send(response);
  } catch (error) {
    return reply.status(500).send({ error });
  }
}

export async function getMarqueeStocksController(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const response = await getMarqueeStocksService();
    return reply.send(response);
  } catch (error) {
    return reply.status(500).send({ error });
  }
}

export async function getQuoteEquityController(request: FastifyRequest, reply: FastifyReply) {
  const { symbol } = request.params as { symbol: string };
  try {
    const response = await getQuoteEquityService(symbol);
    return reply.send(response);
  } catch (error) {
    return reply.status(500).send({ error });
  }
}

export async function getAutoCompleteController(request: FastifyRequest, reply: FastifyReply) {
  const { symbol } = request.params as { symbol: string };
  try {
    const response = await getAutoCompleteService(symbol);
    return reply.send(response);
  } catch (error) {
    return reply.status(500).send({ error });
  }
}

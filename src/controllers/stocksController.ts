import type { FastifyReply, FastifyRequest } from "fastify";
import {
  getAutoCompleteService,
  getGainersService,
  getLosersService,
  getMarketWatchService,
  getMarqueeStocksService,
  getMostActiveEtfService,
  getMostActiveSecuritiesService,
  getMostActiveSmeService,
  getQuoteEquityService,
  getVolumeGainersService,
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

export const getMostActiveSecuritiesController = async (
  _request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const response = await getMostActiveSecuritiesService();
    return reply.send(response);
  } catch (error) {
    return reply.status(500).send({ error });
  }
};

export const getMostActiveSmeController = async (_request: FastifyRequest, reply: FastifyReply) => {
  try {
    const response = await getMostActiveSmeService();
    return reply.send(response);
  } catch (error) {
    return reply.status(500).send({ error });
  }
};

export const getMostActiveEtfController = async (_request: FastifyRequest, reply: FastifyReply) => {
  try {
    const response = await getMostActiveEtfService();
    return reply.send(response);
  } catch (error) {
    return reply.status(500).send({ error });
  }
};

export const getVolumeGainersController = async (_request: FastifyRequest, reply: FastifyReply) => {
  try {
    const response = await getVolumeGainersService();
    return reply.send(response);
  } catch (error) {
    return reply.status(500).send({ error });
  }
};

export const getGainersController = async (_request: FastifyRequest, reply: FastifyReply) => {
  try {
    const response = await getGainersService();
    return reply.send(response);
  } catch (error) {
    return reply.status(500).send({ error });
  }
};

export const getLosersController = async (_request: FastifyRequest, reply: FastifyReply) => {
  try {
    const response = await getLosersService();
    return reply.send(response);
  } catch (error) {
    return reply.status(500).send({ error });
  }
};

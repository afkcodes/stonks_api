import type { FastifyReply, FastifyRequest } from "fastify";
import {
  get52WeekHighService,
  get52WeekLowService,
  getAutoCompleteService,
  getGainersService,
  getIpoCurrentIssueService,
  getIpoUpcomingIssuesService,
  getLargeDealsService,
  getLosersService,
  getMarketWatchService,
  getMarqueeStocksService,
  getMostActiveEtfService,
  getMostActiveSecuritiesService,
  getMostActiveSmeService,
  getPriceBandHitterService,
  getQuoteEquityService,
  getTradedStocksService,
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

export const getTradedStocksController = async (_request: FastifyRequest, reply: FastifyReply) => {
  try {
    const response = await getTradedStocksService();
    return reply.send(response);
  } catch (error) {
    return reply.status(500).send({ error });
  }
};

export const getPriceBandHitterController = async (
  _request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const response = await getPriceBandHitterService();
    return reply.send(response);
  } catch (error) {
    return reply.status(500).send({ error });
  }
};

export const get52WeekHighController = async (_request: FastifyRequest, reply: FastifyReply) => {
  try {
    const response = await get52WeekHighService();
    return reply.send(response);
  } catch (error) {
    return reply.status(500).send({ error });
  }
};

export const get52WeekLowController = async (_request: FastifyRequest, reply: FastifyReply) => {
  try {
    const response = await get52WeekLowService();
    return reply.send(response);
  } catch (error) {
    return reply.status(500).send({ error });
  }
};

export const getLargeDealsController = async (_request: FastifyRequest, reply: FastifyReply) => {
  try {
    const response = await getLargeDealsService();
    return reply.send(response);
  } catch (error) {
    return reply.status(500).send({ error });
  }
};

export const getIpoCurrentIssuesController = async (
  _request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const response = await getIpoCurrentIssueService();
    return reply.send(response);
  } catch (error) {
    return reply.status(500).send({ error });
  }
};

export const getIpoUpcomingIssuesController = async (
  _request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const response = await getIpoUpcomingIssuesService();
    return reply.send(response);
  } catch (error) {
    return reply.status(500).send({ error });
  }
};

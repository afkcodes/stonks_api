import type { FastifyInstance } from 'fastify';
import {
  get52WeekHighController,
  get52WeekLowController,
  getAnnualFinancialReportController,
  getAutoCompleteController,
  getGainersController,
  getIpoCurrentIssuesController,
  getIpoUpcomingIssuesController,
  getLargeDealsController,
  getLosersController,
  getMarketWatchController,
  getMarqueeStocksController,
  getMostActiveEtfController,
  getMostActiveSecuritiesController,
  getMostActiveSmeController,
  getPriceBandHitterController,
  getQuarterlyFinancialReportController,
  getQuoteEquityController,
  getTradedStocksController,
  getVolumeGainersController,
} from '~/controllers/stocksController';

export const stocksRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/watch', getMarketWatchController);
  fastify.get('/marquee', getMarqueeStocksController);
  fastify.get('/quote/:symbol', getQuoteEquityController);
  fastify.get('/autocomplete/:symbol', getAutoCompleteController);
  fastify.get('/most-active-securities', getMostActiveSecuritiesController);
  fastify.get('/most-active-sme', getMostActiveSmeController);
  fastify.get('/most-active-etf', getMostActiveEtfController);
  fastify.get('/volume-gainers', getVolumeGainersController);
  fastify.get('/top-gainers', getGainersController);
  fastify.get('/top-losers', getLosersController);
  fastify.get('/stocks-traded', getTradedStocksController);
  fastify.get('/price-band-hitter', getPriceBandHitterController);
  fastify.get('/52-week-high', get52WeekHighController);
  fastify.get('/52-week-low', get52WeekLowController);
  fastify.get('/large-deals', getLargeDealsController);
  fastify.get('/current-ipos', getIpoCurrentIssuesController);
  fastify.get('/upcoming-ipos', getIpoUpcomingIssuesController);
  fastify.get('/financial-report/qtr/:symbol', getQuarterlyFinancialReportController);
  fastify.get('/financial-report/annual/:symbol', getAnnualFinancialReportController);
};

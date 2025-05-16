import { BASE_HEADERS } from '~/constants/common';
import { COMMODITIES_URL, EQUITY_MASTER, NSE } from '~/constants/urls';
import { processCommodities } from '~/utils/commodities';
import { getNseCookies } from '~/utils/common';
import http from '~/utils/http';
import { processHtml } from '~/utils/sanitize';

const baseUrl = NSE.BASE_URL;

export async function getMarketWatchService() {
  try {
    const response = await http<any>(`${baseUrl}${NSE.MARKET_WATCH}`, {
      headers: BASE_HEADERS,
    });
    return response;
  } catch {
    throw new Error('Internal Server Error, Failed to get market watch');
  }
}

export async function getMarqueeStocksService() {
  try {
    const response = await http<any>(`${baseUrl}${NSE.MARQUEE_STOCKS}`, {
      headers: BASE_HEADERS,
    });
    return response;
  } catch {
    throw new Error('Internal Server Error, Failed to get marquee stocks');
  }
}

export async function getQuoteEquityService(symbol: string) {
  try {
    const cookies = await getNseCookies();
    const response = await http<any>(`${baseUrl}${NSE.QUOTE_EQUITY}${symbol}`, {
      headers: { ...BASE_HEADERS, Cookie: cookies },
    });
    return response;
  } catch {
    throw new Error('Internal Server Error, Failed to get quote equity');
  }
}

export async function getAutoCompleteService(symbol: string) {
  try {
    const response = await http<any>(`${baseUrl}${NSE.AUTO_COMPLETE}${symbol}`, {
      headers: BASE_HEADERS,
    });
    return response;
  } catch {
    throw new Error('Internal Server Error, Failed to get auto complete');
  }
}

export async function getMostActiveSecuritiesService() {
  try {
    const cookies = await getNseCookies();
    const response = await http<any>(`${baseUrl}${NSE.LIVE_ANALYSIS_SECURITIES}`, {
      headers: { ...BASE_HEADERS, Cookie: cookies },
    });
    return response;
  } catch {
    throw new Error('Internal Server Error, Failed to get most active securities');
  }
}

export async function getMostActiveSmeService() {
  try {
    const cookies = await getNseCookies();
    const response = await http<any>(`${baseUrl}${NSE.LIVE_ANALYSIS_SME}`, {
      headers: { ...BASE_HEADERS, Cookie: cookies },
    });
    return response;
  } catch {
    throw new Error('Internal Server Error, Failed to get most active SME');
  }
}

export async function getMostActiveEtfService() {
  try {
    const cookies = await getNseCookies();
    const response = await http<any>(`${baseUrl}${NSE.LIVE_ANALYSIS_ETF}`, {
      headers: { ...BASE_HEADERS, Cookie: cookies },
    });
    return response;
  } catch {
    throw new Error('Internal Server Error, Failed to get most active ETF');
  }
}
export async function getVolumeGainersService() {
  try {
    const cookies = await getNseCookies();
    const response = await http<any>(`${baseUrl}${NSE.LIVE_ANALYSIS_VOLUME_GAINERS}`, {
      headers: { ...BASE_HEADERS, Cookie: cookies },
    });
    return response;
  } catch {
    throw new Error('Internal Server Error, Failed to get volume gainers');
  }
}
export async function getGainersService() {
  try {
    const cookies = await getNseCookies();
    const response = await http<any>(`${baseUrl}${NSE.GAINERS}`, {
      headers: { ...BASE_HEADERS, Cookie: cookies },
    });
    return response;
  } catch {
    throw new Error('Internal Server Error, Failed to get gainers');
  }
}

export async function getLosersService() {
  try {
    const cookies = await getNseCookies();
    const response = await http<any>(`${baseUrl}${NSE.LOSERS}`, {
      headers: { ...BASE_HEADERS, Cookie: cookies },
    });
    return response;
  } catch {
    throw new Error('Internal Server Error, Failed to get losers');
  }
}

export async function getTradedStocksService() {
  try {
    const cookies = await getNseCookies();
    const response = await http<any>(`${baseUrl}${NSE.LIVE_ANALYSIS_STOCKS_TRADED}`, {
      headers: { ...BASE_HEADERS, Cookie: cookies },
    });
    return response;
  } catch {
    throw new Error('Internal Server Error, Failed to get traded stocks');
  }
}

export async function getPriceBandHitterService() {
  try {
    const cookies = await getNseCookies();
    const response = await http<any>(`${baseUrl}${NSE.LIVE_ANALYSIS_PRICE_BAND_HITTER}`, {
      headers: { ...BASE_HEADERS, Cookie: cookies },
    });
    return response;
  } catch {
    throw new Error('Internal Server Error, Failed to get price band hitter');
  }
}

export async function get52WeekHighService() {
  try {
    const cookies = await getNseCookies();
    const response = await http<any>(`${baseUrl}${NSE.LIVE_ANALYSIS_52WEEK_HIGH}`, {
      headers: { ...BASE_HEADERS, Cookie: cookies },
    });
    return response;
  } catch {
    throw new Error('Internal Server Error, Failed to get 52 week high');
  }
}

export async function get52WeekLowService() {
  try {
    const cookies = await getNseCookies();
    const response = await http<any>(`${baseUrl}${NSE.LIVE_ANALYSIS_52WEEK_LOW}`, {
      headers: { ...BASE_HEADERS, Cookie: cookies },
    });
    return response;
  } catch {
    throw new Error('Internal Server Error, Failed to get 52 week low');
  }
}

export async function getLargeDealsService() {
  try {
    const cookies = await getNseCookies();
    const response = await http<any>(`${baseUrl}${NSE.LIVE_ANALYSIS_LARGE_DEAL}`, {
      headers: { ...BASE_HEADERS, Cookie: cookies },
    });
    return response;
  } catch {
    throw new Error('Internal Server Error, Failed to get large deals');
  }
}
export async function getIpoCurrentIssueService() {
  try {
    const cookies = await getNseCookies();
    const response = await http<any>(`${baseUrl}${NSE.IPO_CURRENT_ISSUE}`, {
      headers: { ...BASE_HEADERS, Cookie: cookies },
    });
    return response;
  } catch {
    throw new Error('Internal Server Error, Failed to get current issues');
  }
}

export async function getIpoUpcomingIssuesService() {
  try {
    const cookies = await getNseCookies();
    const response = await http<any>(`${baseUrl}${NSE.IPO_UPCOMING_ISSUES}`, {
      headers: { ...BASE_HEADERS, Cookie: cookies },
    });
    return response;
  } catch {
    throw new Error('Internal Server Error, Failed to get upcoming issues');
  }
}

export async function getCorporateShareHoldingsService(symbol: string) {
  try {
    const cookies = await getNseCookies();
    const response = await http<any>(`${baseUrl}${NSE.CORPORATE_SHARE_HOLDINGS}${symbol}`, {
      headers: { ...BASE_HEADERS, Cookie: cookies },
    });
    return response;
  } catch {
    throw new Error('Internal Server Error, Failed to get corporate share holdings');
  }
}

export const getEquityMasterStockCodeService = async (symbol: string) => {
  try {
    const response = await http<any>(`${EQUITY_MASTER.BASE_URL}${EQUITY_MASTER.AUTO_COMPLETE}`, {
      method: 'POST',
      body: { strData: symbol },
    });
    return { code: response?.d?.[0]?.split('^')?.[1] };
  } catch {
    throw new Error('Internal Server Error, Failed to get stock code');
  }
};

export const getQuarterlyFinancialReportService = async (symbol = 'HDBK') => {
  try {
    const response = await http<any>(`${EQUITY_MASTER.BASE_URL}${EQUITY_MASTER.FACT_SHEET}`, {
      method: 'POST',
      body: {
        t: 'Qtr',
        sym: symbol,
        sect: '',
      },
    });
    return processHtml(response?.d);
  } catch {
    throw new Error('Internal Server Error, Failed to get financial report');
  }
};

export const getAnnualFinancialReportService = async (symbol = 'HDBK') => {
  try {
    const response = await http<any>(`${EQUITY_MASTER.BASE_URL}${EQUITY_MASTER.FACT_SHEET}`, {
      method: 'POST',
      body: {
        t: 'Annl',
        sym: symbol,
        sect: '',
      },
    });
    return processHtml(response?.d);
  } catch {
    throw new Error('Internal Server Error, Failed to get financial report');
  }
};

export async function getCommoditiesService() {
  try {
    const response = await http<any>(COMMODITIES_URL, { responseType: 'text' });
    console.log(response);
    return processCommodities(response);
  } catch {
    throw new Error('Internal Server Error, Failed to get commodities');
  }
}

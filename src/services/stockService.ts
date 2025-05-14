import { BASE_HEADERS } from "~/constants/common";
import { NSE } from "~/constants/urls";
import { getNseCookies } from "~/utils/common";
import http from "~/utils/http";

const baseUrl = NSE.BASE_URL;

export async function getMarketWatchService() {
  try {
    const response = await http<any>(`${baseUrl}${NSE.MARKET_WATCH}`, {
      headers: BASE_HEADERS,
    });
    return response;
  } catch {
    throw new Error("Internal Server Error");
  }
}

export async function getMarqueeStocksService() {
  try {
    const response = await http<any>(`${baseUrl}${NSE.MARQUEE_STOCKS}`, {
      headers: BASE_HEADERS,
    });
    return response;
  } catch {
    throw new Error("Internal Server Error");
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
    throw new Error("Internal Server Error");
  }
}

export async function getAutoCompleteService(symbol: string) {
  try {
    const response = await http<any>(`${baseUrl}${NSE.AUTO_COMPLETE}${symbol}`, {
      headers: BASE_HEADERS,
    });
    return response;
  } catch {
    throw new Error("Internal Server Error");
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
    throw new Error("Internal Server Error");
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
    throw new Error("Internal Server Error");
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
    throw new Error("Internal Server Error");
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
    throw new Error("Internal Server Error");
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
    throw new Error("Internal Server Error");
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
    throw new Error("Internal Server Error");
  }
}

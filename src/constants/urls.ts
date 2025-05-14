export const NSE = {
  BASE_URL: "https://www.nseindia.com",
  MARQUEE_STOCKS: "/api/NextApi/apiClient?functionName=getMarqueData",
  MARKET_WATCH: "/api/NextApi/apiClient?functionName=getIndexData&type=All",
  AUTO_COMPLETE: "/api/search/autocomplete?q=",
  QUOTE_EQUITY: "/api/quote-equity?symbol=",
  LIVE_ANALYSIS_SECURITIES: "/api/live-analysis-most-active-securities?index=value",
  LIVE_ANALYSIS_SME: "/api/live-analysis-most-active-sme?index=volume",
  LIVE_ANALYSIS_ETF: "/api/live-analysis-most-active-etf?index=volume",
  LIVE_ANALYSIS_VOLUME_GAINERS: "/api/live-analysis-volume-gainers",
  GAINERS: "/api/live-analysis-variations?index=gainers",
  LOSERS: "/api/live-analysis-variations?index=loosers", // done upto here
  LIVE_ANALYSIS_STOCKS_TRADED: "/api/live-analysis-stocksTraded",
  LIVE_ANALYSIS_PRICE_BAND_HITTER: "/api/live-analysis-price-band-hitter",
  LIVE_ANALYSIS_52WEEK_HIGH: "/api/live-analysis-data-52weekhighstock",
  LIVE_ANALYSIS_52WEEK_LOW: "/api/live-analysis-data-52weeklowstock",
  LIVE_ANALYSIS_LARGE_DEAL: "/api/snapshot-capital-market-largedeal",
  IPO_CURRENT_ISSUE: "/api/ipo-current-issue",
  IPO_UPCOMING_ISSUES: "/api/all-upcoming-issues?category=ipo",
  CORPORATE_SHARE_HOLDINGS: "/api/corporate-share-holdings-master?index=equities&symbol=",
  CORPORATE_FINANCIAL_RESULTS_QUARTERLY:
    "/api/corporates-financial-results?index=equities&symbol=###symbol###&period=Quarterly",
  CORPORATE_FINANCIAL_RESULTS_ANNUAL:
    "/api/corporates-financial-results?index=equities&symbol=###symbol###&period=Annual",
};

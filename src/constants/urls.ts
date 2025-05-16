// https://www.equitymaster.com/charts/graphhc.aspx?type=pe&symbol=HDBK&period=7&_=1747366814325  - PE-RATIO
// https://www.equitymaster.com/charts/graphhc.aspx?type=mavg&symbol=HDBK&period=6&mavg=%2715,30,100,200,%27&_=1747366814326 MOVING AVERAGE
// https://www.equitymaster.com/charts/graphhc.aspx?type=comp&symbol=HDBK,HDBK,IDBL,BSNX,NIFTY,&period=6&_=1747366814330 - COMPARATIVE
// https://www.equitymaster.com/charts/graphhc.aspx?type=ch&symbol=HDBK&period=6&_=1747367361847 - CHART (1-to-8)
// https://www.equitymaster.com/stock-screener/result.aspx/ScreenerAJAX (bought by FIIs) {id:80,scol:"4",sdir:"desc",page:"4",fil:"sect:~mcap:",export:"n",c_sector:"",c_params:"",c_comp:"",c_val:""}
// {id:81,scol:"4",sdir:"asc",page:"2",fil:"sect:~mcap:",export:"n",c_sector:"",c_params:"",c_comp:"",c_val:""} -sold by FIIs
// {id:64,scol:"2",sdir:"desc",page:"2",fil:"sect:~mcap:",export:"n",c_sector:"",c_params:"",c_comp:"",c_val:""} - MultiBagger Penny Stocks

export const NSE = {
  BASE_URL: 'https://www.nseindia.com',
  MARQUEE_STOCKS: '/api/NextApi/apiClient?functionName=getMarqueData',
  MARKET_WATCH: '/api/NextApi/apiClient?functionName=getIndexData&type=All',
  AUTO_COMPLETE: '/api/search/autocomplete?q=',
  QUOTE_EQUITY: '/api/quote-equity?symbol=',
  LIVE_ANALYSIS_SECURITIES: '/api/live-analysis-most-active-securities?index=value',
  LIVE_ANALYSIS_SME: '/api/live-analysis-most-active-sme?index=volume',
  LIVE_ANALYSIS_ETF: '/api/live-analysis-most-active-etf?index=volume',
  LIVE_ANALYSIS_VOLUME_GAINERS: '/api/live-analysis-volume-gainers',
  GAINERS: '/api/live-analysis-variations?index=gainers',
  LOSERS: '/api/live-analysis-variations?index=loosers',
  LIVE_ANALYSIS_STOCKS_TRADED: '/api/live-analysis-stocksTraded',
  LIVE_ANALYSIS_PRICE_BAND_HITTER: '/api/live-analysis-price-band-hitter',
  LIVE_ANALYSIS_52WEEK_HIGH: '/api/live-analysis-data-52weekhighstock',
  LIVE_ANALYSIS_52WEEK_LOW: '/api/live-analysis-data-52weeklowstock',
  LIVE_ANALYSIS_LARGE_DEAL: '/api/snapshot-capital-market-largedeal',
  IPO_CURRENT_ISSUE: '/api/ipo-current-issue',
  IPO_UPCOMING_ISSUES: '/api/all-upcoming-issues?category=ipo', // done upto here
  CORPORATE_SHARE_HOLDINGS: '/api/corporate-share-holdings-master?index=equities&symbol=',
  CORPORATE_FINANCIAL_RESULTS_QUARTERLY:
    '/api/corporates-financial-results?index=equities&symbol=###symbol###&period=Quarterly',
  CORPORATE_FINANCIAL_RESULTS_ANNUAL:
    '/api/corporates-financial-results?index=equities&symbol=###symbol###&period=Annual',
};

export const EQUITY_MASTER = {
  BASE_URL: 'https://www.equitymaster.com',
  FACT_SHEET: '/research-it/factsheet/factsheet.aspx/FSAJAX',
  AUTO_COMPLETE: '/AsyncData.asmx/CompanyAC',
};

export const COMMODITIES_URL =
  'https://economictimes.indiatimes.com/commodities_newet_stats_movers.cms?language=';

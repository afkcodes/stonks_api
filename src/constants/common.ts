import { NSE } from "./urls";

export const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36";

export const BASE_HEADERS = {
  Authority: "www.nseindia.com",
  Referer: "https://www.nseindia.com/",
  Accept: "*/*",
  Origin: NSE.BASE_URL,
  "Accept-Language": "en-US,en;q=0.9",
  "Accept-Encoding": "application/json, text/plain, */*",
  Connection: "keep-alive",
  "User-Agent": USER_AGENT,
};

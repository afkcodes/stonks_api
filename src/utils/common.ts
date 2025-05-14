import { BASE_HEADERS, USER_AGENT } from "~/constants/common";
import { NSE } from "~/constants/urls";

/**
 * Gets NSE cookies
 * @returns Cookie string
 */
export const getNseCookies = async (): Promise<string> => {
  try {
    const response = await fetch(`${NSE.BASE_URL}/get-quotes/equity?symbol=TCS`, {
      headers: {
        ...BASE_HEADERS,
        "User-Agent": USER_AGENT,
      },
    });

    const cookies: string[] = [];

    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        cookies.push(value.split(";")[0]);
      }
    });

    return cookies.join("; ");
  } catch {
    return "";
  }
};

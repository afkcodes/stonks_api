type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface HttpOptions {
  method?: HttpMethod;
  params?: Record<string, any>;
  pathParams?: Record<string, string>;
  headers?: Record<string, string>;
  body?: any;
  expectedStatus?: number | number[];
  responseType?: "json" | "text";
  timeout?: number;
}

/**
 * HTTP client function for making API requests
 *
 * @param url The URL to fetch
 * @param options Request options including method, params, headers, etc.
 * @returns Promise resolving to response data or null
 */
async function http<T>(url: string, options: HttpOptions = {}): Promise<T | null> {
  const {
    method = "GET",
    params,
    pathParams,
    headers = {},
    body,
    expectedStatus = 200,
    responseType = "json",
    timeout = 30000,
  } = options;

  // Setup request options
  const requestOptions: RequestInit = {
    method,
    headers: {
      ...headers,
    },
  };

  // Configure AbortController for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  requestOptions.signal = controller.signal;

  // Handle body for different methods
  if (body && (method === "POST" || method === "PUT")) {
    if (body instanceof FormData) {
      requestOptions.body = body;
    } else {
      (requestOptions.headers as Record<string, string>)["content-type"] = "application/json";
      requestOptions.body = JSON.stringify(body);
    }
  } else if (body && method !== "POST" && method !== "PUT") {
    const invalidMethodError = new Error("Request body is only supported for POST and PUT methods");
    console.error(`Invalid request: ${invalidMethodError.message}`);
    clearTimeout(timeoutId);
    throw invalidMethodError;
  }

  // Process URL with path parameters
  let requestUrl = url;
  if (pathParams) {
    Object.entries(pathParams).forEach(([key, value]) => {
      requestUrl = requestUrl.replace(`:${key}`, encodeURIComponent(String(value)));
    });
  }

  // Process query parameters
  if (params) {
    const queryParams = new URLSearchParams();

    // Handle nested objects and arrays in params
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return; // Skip null/undefined values
      }

      if (Array.isArray(value)) {
        // Handle arrays (like ?ids[]=1&ids[]=2 or ?ids=1,2)
        value.forEach((item) => {
          queryParams.append(`${key}[]`, String(item));
        });
      } else if (typeof value === "object") {
        // Handle nested objects
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          queryParams.append(`${key}[${nestedKey}]`, String(nestedValue));
        });
      } else {
        // Handle primitive values
        queryParams.append(key, String(value));
      }
    });

    const queryString = queryParams.toString();
    if (queryString) {
      requestUrl += (requestUrl.includes("?") ? "&" : "?") + queryString;
    }
  }

  try {
    const response = await fetch(requestUrl, requestOptions);

    // Validate status code
    const isStatusValid = Array.isArray(expectedStatus)
      ? expectedStatus.includes(response.status)
      : response.status === expectedStatus;

    if (!isStatusValid) {
      // Try to parse error response
      let errorData: any;
      try {
        errorData = await response.json();
      } catch (e) {
        try {
          errorData = await response.text();
        } catch (e) {
          errorData = null;
        }
      }

      const statusError = new Error(`Request failed with status ${response.status}`);
      (statusError as any).status = response.status;
      (statusError as any).data = errorData;
      console.error(`Request error: ${statusError.message}`, errorData);
      throw statusError;
    }

    // Handle empty responses
    if (response.status === 204 || response.headers.get("content-length") === "0") {
      return null;
    }

    // Parse response based on type
    if (responseType === "json") {
      const responseData = (await response.json()) as T;
      return responseData;
    }
    if (responseType === "text") {
      const responseData = (await response.text()) as unknown as T;
      return responseData;
    }
    const invalidResponseError = new Error(`Invalid responseType: ${responseType}`);
    console.error(`Response error: ${invalidResponseError.message}`);
    throw invalidResponseError;
  } catch (error: any) {
    if (error.name === "AbortError") {
      error.message = `Request timeout after ${timeout}ms`;
    }
    console.error(`An error occurred: ${error.message}`);
    throw error; // Re-throw the error for higher-level error handling
  } finally {
    clearTimeout(timeoutId);
  }
}

export default http;

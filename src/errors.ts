export interface FailedAPIResponseDetail {
  "@type": string;
  requestId?: string;
  servingData?: string;
}

export interface FailedAPIResponse {
  code: number;
  message: string;
  details?: FailedAPIResponseDetail[];
}

/** Thrown when a required argument is missing or invalid. */
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class APIRequestError extends Error {
  readonly statusCode: number;
  readonly errorData?: FailedAPIResponse;

  constructor(statusCode: number, errorData: FailedAPIResponse);
  constructor(message: string, statusCode: number);
  constructor(
    statusCodeOrMessage: number | string,
    errorDataOrStatusCode: FailedAPIResponse | number,
  ) {
    if (typeof statusCodeOrMessage === "number") {
      const errorData = errorDataOrStatusCode as FailedAPIResponse;
      super(JSON.stringify(errorData));
      this.statusCode = statusCodeOrMessage;
      this.errorData = errorData;
    } else {
      super(statusCodeOrMessage);
      this.statusCode = errorDataOrStatusCode as number;
    }
    this.name = "APIRequestError";
  }
}

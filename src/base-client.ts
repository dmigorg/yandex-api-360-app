import { APIRequestError, type FailedAPIResponse } from "./errors.js";
import type { Api360Options } from "./options.js";

const ERROR_STATUSES = new Set([400, 401, 403, 404, 409, 500]);

export abstract class BaseClient {
  protected readonly options: Api360Options;

  constructor(options: Api360Options) {
    this.options = options;
  }

  private get headers(): Record<string, string> {
    return {
      Authorization: `OAuth ${this.options.token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }

  private async checkResponse(response: Response): Promise<void> {
    if (response.status === 200 || response.status === 201) return;

    if (ERROR_STATUSES.has(response.status)) {
      let body: FailedAPIResponse | null = null;
      try {
        body = (await response.json()) as FailedAPIResponse;
      } catch {
        throw new APIRequestError(response.statusText || "Unknown error", response.status);
      }
      if (body) throw new APIRequestError(response.status, body);
    }

    throw new APIRequestError(response.statusText || "Unknown error", response.status);
  }

  protected async httpGet<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    await this.checkResponse(response);
    return response.json() as Promise<T>;
  }

  protected async httpPost<T>(url: string, body?: unknown): Promise<T> {
    const response = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    await this.checkResponse(response);
    return response.json() as Promise<T>;
  }

  protected async httpPut<T>(url: string, body?: unknown): Promise<T> {
    const response = await fetch(url, {
      method: "PUT",
      headers: this.headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    await this.checkResponse(response);
    return response.json() as Promise<T>;
  }

  protected async httpPatch<T>(url: string, body?: unknown): Promise<T> {
    const response = await fetch(url, {
      method: "PATCH",
      headers: this.headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    await this.checkResponse(response);
    return response.json() as Promise<T>;
  }

  protected async httpDelete<T = void>(url: string): Promise<T> {
    const response = await fetch(url, {
      method: "DELETE",
      headers: this.headers,
    });
    await this.checkResponse(response);
    if (response.status === 204 || response.headers.get("content-length") === "0") {
      return undefined as T;
    }
    try {
      return response.json() as Promise<T>;
    } catch {
      return undefined as T;
    }
  }

  protected async httpPutMultipart<T>(url: string, formData: FormData): Promise<T> {
    const headers: Record<string, string> = {
      Authorization: `OAuth ${this.options.token}`,
      Accept: "application/json",
    };
    const response = await fetch(url, {
      method: "PUT",
      headers,
      body: formData,
    });
    await this.checkResponse(response);
    return response.json() as Promise<T>;
  }
}

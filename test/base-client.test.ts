import { describe, expect, test } from "bun:test";
import { BaseClient } from "@src/base-client.js";
import { APIRequestError } from "@src/errors.js";
import { makeOptions, mockFetch, mockFetchEmpty, mockFetchError } from "./helpers.js";

class TestClient extends BaseClient {
  get<T>(url: string) {
    return this.httpGet<T>(url);
  }
  post<T>(url: string, body?: unknown) {
    return this.httpPost<T>(url, body);
  }
  put<T>(url: string, body?: unknown) {
    return this.httpPut<T>(url, body);
  }
  patch<T>(url: string, body?: unknown) {
    return this.httpPatch<T>(url, body);
  }
  del<T = void>(url: string) {
    return this.httpDelete<T>(url);
  }
  putBinary<T>(url: string, body: ArrayBuffer | Blob, contentType: string) {
    return this.httpPutBinary<T>(url, body, contentType);
  }
}

const client = new TestClient(makeOptions());

describe("BaseClient HTTP methods", () => {
  test("httpGet sends GET with Authorization header", async () => {
    const spy = mockFetch({ id: 1 });
    const result = await client.get<{ id: number }>("https://example.com/test");

    expect(result).toEqual({ id: 1 });
    expect(spy).toHaveBeenCalledTimes(1);
    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://example.com/test");
    expect((init.headers as Record<string, string>).Authorization).toBe("OAuth test-token");
    expect(init.method).toBe("GET");
  });

  test("httpPost sends POST with JSON body", async () => {
    const spy = mockFetch({ created: true });
    const body = { name: "test" };
    await client.post("https://example.com/test", body);

    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("POST");
    expect(init.body).toBe(JSON.stringify(body));
    expect((init.headers as Record<string, string>)["Content-Type"]).toBe("application/json");
  });

  test("httpPut sends PUT with JSON body", async () => {
    const spy = mockFetch({ updated: true });
    await client.put("https://example.com/test", { value: 42 });

    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("PUT");
    expect(init.body).toBe(JSON.stringify({ value: 42 }));
  });

  test("httpPatch sends PATCH with JSON body", async () => {
    const spy = mockFetch({ patched: true });
    await client.patch("https://example.com/test", { field: "x" });

    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("PATCH");
    expect(init.body).toBe(JSON.stringify({ field: "x" }));
  });

  test("httpDelete sends DELETE and returns parsed body", async () => {
    const spy = mockFetch({ removed: true });
    const result = await client.del<{ removed: boolean }>("https://example.com/test");

    expect(result).toEqual({ removed: true });
    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("DELETE");
  });

  test("httpDelete returns undefined for 204 No Content", async () => {
    mockFetchEmpty(204);
    const result = await client.del("https://example.com/test");
    expect(result).toBeUndefined();
  });

  test("httpPutBinary sends PUT with binary body and correct Content-Type", async () => {
    const spy = mockFetch({ url: "https://avatars.example.com/1.png" });
    const buf = new ArrayBuffer(8);
    await client.putBinary("https://example.com/avatar", buf, "image/png");

    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("PUT");
    expect((init.headers as Record<string, string>)["Content-Type"]).toBe("image/png");
    expect(init.body).toBe(buf);
  });
});

describe("BaseClient error handling", () => {
  test("throws APIRequestError for 400 Bad Request", async () => {
    const errorBody = { code: 400, message: "invalid_argument" };
    mockFetchError(errorBody, 400);

    await expect(client.get("https://example.com/test")).rejects.toBeInstanceOf(APIRequestError);
  });

  test("throws APIRequestError with correct statusCode", async () => {
    mockFetchError({ code: 401, message: "unauthorized" }, 401);

    const err = (await client.get("https://example.com/test").catch((e) => e)) as APIRequestError;
    expect(err.statusCode).toBe(401);
  });

  test("throws APIRequestError for 403 Forbidden", async () => {
    mockFetchError({ code: 403, message: "permission_denied" }, 403);

    const err = (await client.get("https://example.com/test").catch((e) => e)) as APIRequestError;
    expect(err.statusCode).toBe(403);
    expect(err.errorData?.message).toBe("permission_denied");
  });

  test("throws APIRequestError for 404 Not Found", async () => {
    mockFetchError({ code: 404, message: "not_found" }, 404);

    const err = (await client.get("https://example.com/test").catch((e) => e)) as APIRequestError;
    expect(err.statusCode).toBe(404);
  });

  test("throws APIRequestError for 409 Conflict", async () => {
    mockFetchError({ code: 409, message: "already_exists" }, 409);

    const err = (await client.get("https://example.com/test").catch((e) => e)) as APIRequestError;
    expect(err.statusCode).toBe(409);
  });

  test("throws APIRequestError for 500 Internal Server Error", async () => {
    mockFetchError({ code: 500, message: "internal" }, 500);

    const err = (await client.get("https://example.com/test").catch((e) => e)) as APIRequestError;
    expect(err.statusCode).toBe(500);
  });
});

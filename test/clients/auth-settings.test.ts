import { describe, expect, test } from "bun:test";
import { AuthSettingsClient } from "@src/clients/auth-settings.js";
import { makeOptions, mockFetch } from "../helpers.js";

const client = new AuthSettingsClient(makeOptions());

describe("AuthSettingsClient", () => {
  test("getAuthTtl returns TTL value", async () => {
    mockFetch({ authTTL: 86400 });
    const result = await client.getAuthTtl();
    expect(result).toBe(86400);
  });

  test("getAuthTtl calls correct URL", async () => {
    const spy = mockFetch({ authTTL: 0 });
    await client.getAuthTtl();

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("/domain_sessions");
  });

  test("setAuthTtl sends POST with authTTL body", async () => {
    const spy = mockFetch({ authTTL: 3600 });
    const result = await client.setAuthTtl(3600);

    expect(result).toBe(3600);
    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body as string)).toEqual({ authTTL: 3600 });
  });

  test("setAuthTtl with 0 disables session expiry", async () => {
    const spy = mockFetch({ authTTL: 0 });
    const result = await client.setAuthTtl(0);

    expect(result).toBe(0);
    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(JSON.parse(init.body as string)).toEqual({ authTTL: 0 });
  });

  test("logoutUser sends PUT to correct URL", async () => {
    const spy = mockFetch({});
    await client.logoutUser(42);

    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("PUT");
    expect(url).toContain("/domain_sessions/users/42/logout");
  });
});

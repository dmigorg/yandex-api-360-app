import { describe, expect, test } from "bun:test";
import { TwoFAClient } from "@src/clients/two-fa.js";
import { ValidationError } from "@src/errors.js";
import { makeOptions, mockFetch } from "../helpers.js";

const client = new TwoFAClient(makeOptions());

const STATUS_V1 = { enabled: true, duration: 86400, enabledAt: "2024-01-01T00:00:00Z" };
const STATUS_V2 = {
  enabled: true,
  duration: 86400,
  enabledAt: "2024-01-01T00:00:00Z",
  scope: "per_domain",
};

describe("TwoFAClient", () => {
  test("getStatus returns 2FA status", async () => {
    mockFetch(STATUS_V1);
    const result = await client.getStatus();

    expect(result.enabled).toBe(true);
    expect(result.duration).toBe(86400);
  });

  test("getStatus calls v1 URL", async () => {
    const spy = mockFetch(STATUS_V1);
    await client.getStatus();

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("/security/v1/");
    expect(url).toContain("/domain_2fa");
  });

  test("enable sends POST with status2FA config", async () => {
    const spy = mockFetch(STATUS_V1);
    const result = await client.enable({ duration: 3600, logoutUsers: false });

    expect(result.enabled).toBe(true);
    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body as string).duration).toBe(3600);
  });

  test("enable throws when status2FA is null", async () => {
    await expect(client.enable(null as never)).rejects.toThrow(
      new ValidationError("status2FA is required"),
    );
  });

  test("disable sends DELETE to v1 URL", async () => {
    const spy = mockFetch({ ...STATUS_V1, enabled: false });
    const result = await client.disable();

    expect(result.enabled).toBe(false);
    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("DELETE");
  });

  test("getStatusV2 returns v2 2FA status", async () => {
    mockFetch(STATUS_V2);
    const result = await client.getStatusV2();

    expect(result.enabled).toBe(true);
    expect(result.scope).toBe("per_domain");
  });

  test("getStatusV2 calls v2 URL", async () => {
    const spy = mockFetch(STATUS_V2);
    await client.getStatusV2();

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("/security/v2/");
    expect(url).toContain("/domain_2fa");
  });

  test("enableV2 sends POST with v2 config", async () => {
    const spy = mockFetch(STATUS_V2);
    const config = { duration: 7200, logoutUsers: true, scope: "per_user" as never };
    const result = await client.enableV2(config);

    expect(result.scope).toBe("per_domain");
    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body as string).scope).toBe("per_user");
  });

  test("enableV2 throws when status2FA is null", async () => {
    await expect(client.enableV2(null as never)).rejects.toThrow(
      new ValidationError("status2FA is required"),
    );
  });

  test("disableV2 sends DELETE to v2 URL", async () => {
    const spy = mockFetch({ ...STATUS_V2, enabled: false });
    const result = await client.disableV2();

    expect(result.enabled).toBe(false);
    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("DELETE");
  });
});

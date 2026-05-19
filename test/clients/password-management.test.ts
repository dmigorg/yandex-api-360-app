import { describe, expect, test } from "bun:test";
import { PasswordManagementClient } from "@src/clients/password-management.js";
import { ValidationError } from "@src/errors.js";
import { makeOptions, mockFetch } from "../helpers.js";

const client = new PasswordManagementClient(makeOptions());

describe("PasswordManagementClient", () => {
  test("getParameters returns password policy", async () => {
    mockFetch({ enabled: true, changeFrequency: 90 });
    const result = await client.getParameters();

    expect(result.enabled).toBe(true);
    expect(result.changeFrequency).toBe(90);
  });

  test("getParameters calls correct URL", async () => {
    const spy = mockFetch({ enabled: false });
    await client.getParameters();

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("/domain_passwords");
  });

  test("setParameters sends PUT with policy data", async () => {
    const policy = { enabled: true, changeFrequency: 30 };
    const spy = mockFetch(policy);
    const result = await client.setParameters(policy);

    expect(result.enabled).toBe(true);
    expect(result.changeFrequency).toBe(30);

    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("PUT");
    expect(JSON.parse(init.body as string)).toEqual(policy);
  });

  test("setParameters calls correct URL", async () => {
    const spy = mockFetch({ enabled: false });
    await client.setParameters({ enabled: false });

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("/domain_passwords");
  });

  test("setParameters throws when parameters is null", async () => {
    await expect(client.setParameters(null as never)).rejects.toThrow(
      new ValidationError("parameters is required"),
    );
  });

  test("setParameters with disabled policy", async () => {
    const spy = mockFetch({ enabled: false });
    await client.setParameters({ enabled: false });

    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(JSON.parse(init.body as string).enabled).toBe(false);
  });
});

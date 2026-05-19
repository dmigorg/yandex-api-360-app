import { describe, expect, test } from "bun:test";
import { PostSettingsClient } from "@src/clients/post-settings.js";
import { ValidationError } from "@src/errors.js";
import { makeOptions, mockFetch, mockFetchEmpty } from "../helpers.js";

const client = new PostSettingsClient(makeOptions());

const SENDER_INFO = {
  defaultFrom: "user@example.com",
  fromName: "John Doe",
  signs: [],
  singleSignId: 0,
};

describe("PostSettingsClient", () => {
  test("getSenderInfo returns user personal settings", async () => {
    mockFetch(SENDER_INFO);
    const result = await client.getSenderInfo(42);

    expect(result.fromName).toBe("John Doe");
    expect(result.defaultFrom).toBe("user@example.com");
  });

  test("getSenderInfo calls correct URL", async () => {
    const spy = mockFetch(SENDER_INFO);
    await client.getSenderInfo(42);

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("/mail/users/42/settings/sender_info");
  });

  test("setSenderInfo sends POST with settings", async () => {
    const spy = mockFetch(SENDER_INFO);
    await client.setSenderInfo(42, SENDER_INFO);

    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body as string).fromName).toBe("John Doe");
  });

  test("setSenderInfo throws when settings is null", async () => {
    await expect(client.setSenderInfo(42, null as never)).rejects.toThrow(
      new ValidationError("settings is required"),
    );
  });

  test("getCollectAddresses returns status", async () => {
    mockFetch({ collectAddresses: true });
    const result = await client.getCollectAddresses(42);

    expect(result.collectAddresses).toBe(true);
  });

  test("getCollectAddresses calls correct URL", async () => {
    const spy = mockFetch({ collectAddresses: false });
    await client.getCollectAddresses(42);

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("/mail/users/42/settings/address_book");
  });

  test("setCollectAddresses sends POST with status", async () => {
    const spy = mockFetch({ collectAddresses: true });
    await client.setCollectAddresses(42, { collectAddresses: true });

    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body as string)).toEqual({ collectAddresses: true });
  });

  test("setCollectAddresses throws when status is null", async () => {
    await expect(client.setCollectAddresses(42, null as never)).rejects.toThrow(
      "status is required",
    );
  });

  test("getUserRules returns rules list", async () => {
    const rules = { autoreplies: [], forwards: [] };
    mockFetch(rules);
    const result = await client.getUserRules(42);

    expect(result.autoreplies).toEqual([]);
    expect(result.forwards).toEqual([]);
  });

  test("getUserRules calls correct URL", async () => {
    const spy = mockFetch({ autoreplyRules: [], forwardRules: [] });
    await client.getUserRules(42);

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("/mail/users/42/settings/user_rules");
  });

  test("addUserRule sends POST and returns ruleId", async () => {
    const spy = mockFetch({ ruleId: 7 });
    const result = await client.addUserRule(42, {
      ruleName: "AutoReply",
      text: "I am on vacation",
    } as never);

    expect(result).toBe(7);
    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("POST");
  });

  test("addUserRule throws when rule is null", async () => {
    await expect(client.addUserRule(42, null as never)).rejects.toThrow(
      new ValidationError("rule is required"),
    );
  });

  test("deleteUserRule sends DELETE to correct URL", async () => {
    const spy = mockFetchEmpty(204);
    await client.deleteUserRule(42, 7);

    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("DELETE");
    expect(url).toContain("/mail/users/42/settings/user_rules/7");
  });
});

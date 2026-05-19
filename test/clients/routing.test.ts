import { describe, expect, test } from "bun:test";
import { RoutingClient } from "@src/clients/routing.js";
import { ActionTypes, DirectionTypes } from "@src/types/index.js";
import { makeOptions, mockFetch } from "../helpers.js";

const client = new RoutingClient(makeOptions());

const RULE = {
  actions: [{ action: ActionTypes.forward, data: { email: "support@example.com" } }],
  condition: { type: "subject", value: "[TICKET]" },
  scope: { direction: DirectionTypes.inbound },
  terminal: false,
};

describe("RoutingClient", () => {
  test("getRules returns array of rules", async () => {
    mockFetch({ rules: [RULE] });
    const result = await client.getRules();

    expect(result).toHaveLength(1);
    expect(result[0]?.terminal).toBe(false);
  });

  test("getRules returns empty array when no rules", async () => {
    mockFetch({ rules: [] });
    const result = await client.getRules();
    expect(result).toEqual([]);
  });

  test("getRules calls correct URL", async () => {
    const spy = mockFetch({ rules: [] });
    await client.getRules();

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("/mail/routing/rules");
  });

  test("setRules sends PUT with rules list", async () => {
    const spy = mockFetch({ rules: [RULE] });
    await client.setRules({ rules: [RULE] });

    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("PUT");
    const body = JSON.parse(init.body as string);
    expect(body.rules).toHaveLength(1);
    expect(body.rules[0].terminal).toBe(false);
  });

  test("setRules calls correct URL", async () => {
    const spy = mockFetch({ rules: [] });
    await client.setRules({ rules: [] });

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("/mail/routing/rules");
  });

  test("setRules with empty rules list clears all rules", async () => {
    const spy = mockFetch({ rules: [] });
    await client.setRules({ rules: [] });

    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(init.body as string);
    expect(body.rules).toEqual([]);
  });
});

import { describe, expect, test } from "bun:test";
import { AntispamClient } from "@src/clients/antispam.js";
import { makeOptions, mockFetch, mockFetchEmpty } from "../helpers.js";

const client = new AntispamClient(makeOptions());

describe("AntispamClient", () => {
  test("getAllowList returns array of IPs", async () => {
    mockFetch({ allowList: ["1.2.3.4", "10.0.0.0/8"] });
    const result = await client.getAllowList();
    expect(result).toEqual(["1.2.3.4", "10.0.0.0/8"]);
  });

  test("getAllowList returns empty array when list is empty", async () => {
    mockFetch({ allowList: [] });
    const result = await client.getAllowList();
    expect(result).toEqual([]);
  });

  test("setAllowList sends POST with allowList body", async () => {
    const spy = mockFetch({});
    await client.setAllowList(["77.88.21.249"]);

    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body as string)).toEqual({ allowList: ["77.88.21.249"] });
  });

  test("deleteAllowList sends DELETE request", async () => {
    const spy = mockFetchEmpty(204);
    await client.deleteAllowList();

    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("DELETE");
  });

  test("getAllowList calls correct URL", async () => {
    const spy = mockFetch({ allowList: [] });
    await client.getAllowList();

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("/mail/antispam/allowlist/ips");
  });
});

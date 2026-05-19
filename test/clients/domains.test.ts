import { describe, expect, test } from "bun:test";
import { DomainsClient } from "@src/clients/domains.js";
import { ValidationError } from "@src/errors.js";
import { makeOptions, mockFetch, mockFetchEmpty, mockFetchSequence } from "../helpers.js";

const client = new DomainsClient(makeOptions());

const DOMAIN = {
  name: "example.com",
  country: "ru",
  mx: true,
  delegated: true,
  master: true,
  verified: true,
  status: {},
};

describe("DomainsClient", () => {
  test("getList returns paginated domains", async () => {
    mockFetch({ domains: [DOMAIN], page: 1, pages: 1, perPage: 10, total: 1 });
    const result = await client.getList();

    expect(result.domains).toHaveLength(1);
    expect(result.domains[0]?.name).toBe("example.com");
  });

  test("getList calls correct URL with pagination", async () => {
    const spy = mockFetch({ domains: [], page: 1, pages: 1, perPage: 10, total: 0 });
    await client.getList(3, 5);

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("page=3");
    expect(url).toContain("perPage=5");
  });

  test("getAll returns all domains", async () => {
    mockFetchSequence([
      { data: { domains: [DOMAIN], page: 1, pages: 1, perPage: 10, total: 1 } },
      { data: { domains: [DOMAIN], page: 1, pages: 1, perPage: 1, total: 1 } },
    ]);
    const result = await client.getAll();
    expect(result).toHaveLength(1);
  });

  test("add sends POST with domain name", async () => {
    const spy = mockFetch(DOMAIN);
    await client.add("example.com");

    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body as string)).toEqual({ domain: "example.com" });
  });

  test("add throws when domainName is empty", async () => {
    await expect(client.add("")).rejects.toThrow(new ValidationError("domainName is required"));
  });

  test("remove sends DELETE to correct URL", async () => {
    const spy = mockFetchEmpty(204);
    await client.remove("example.com");

    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("DELETE");
    expect(url).toContain("/domains/example.com");
  });

  test("remove throws when domainName is empty", async () => {
    await expect(client.remove("")).rejects.toThrow(new ValidationError("domainName is required"));
  });

  test("getStatus returns DomainConnectStatus", async () => {
    mockFetch({ status: "verified", methods: [{ method: "html", code: "abc123" }] });
    const result = await client.getStatus("example.com");

    expect(result.status).toBe("verified");
    expect(result.methods).toHaveLength(1);
  });

  test("getStatus calls correct URL", async () => {
    const spy = mockFetch({ status: "not_verified", methods: [] });
    await client.getStatus("example.com");

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("/domains/example.com/status");
  });

  test("getDKIMStatus returns enabled flag and publicKey", async () => {
    mockFetch({ enabled: true, publicKey: "v=DKIM1; k=rsa; p=ABC" });
    const result = await client.getDKIMStatus("example.com");

    expect(result.enabled).toBe(true);
    expect(result.publicKey).toBe("v=DKIM1; k=rsa; p=ABC");
  });

  test("enableDKIM sends POST to correct URL", async () => {
    const spy = mockFetch({});
    await client.enableDKIM("example.com");

    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("POST");
    expect(url).toContain("/domains/example.com/dkim/enable");
  });

  test("disableDKIM sends POST to correct URL", async () => {
    const spy = mockFetch({});
    await client.disableDKIM("example.com");

    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("POST");
    expect(url).toContain("/domains/example.com/dkim/disable");
  });
});

import { describe, expect, test } from "bun:test";
import { DNSClient } from "@src/clients/dns.js";
import { ValidationError } from "@src/errors.js";
import { DNSRecordTypes } from "@src/types/index.js";
import { makeOptions, mockFetch, mockFetchEmpty, mockFetchSequence } from "../helpers.js";

const client = new DNSClient(makeOptions());

const DNS_RECORD = {
  recordId: 1,
  name: "example.com.",
  type: DNSRecordTypes.A,
  address: "1.2.3.4",
  ttl: 3600,
};

describe("DNSClient", () => {
  test("getList returns paginated DNS records", async () => {
    mockFetch({ records: [DNS_RECORD], page: 1, pages: 1, perPage: 10, total: 1 });
    const result = await client.getList("example.com");

    expect(result.records).toHaveLength(1);
    expect(result.records[0]?.type).toBe(DNSRecordTypes.A);
  });

  test("getList sends correct URL with domain and pagination", async () => {
    const spy = mockFetch({ records: [], page: 1, pages: 1, perPage: 10, total: 0 });
    await client.getList("example.com", 2, 50);

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("/example.com/dns");
    expect(url).toContain("page=2");
    expect(url).toContain("perPage=50");
  });

  test("getAll returns all records from single page", async () => {
    mockFetchSequence([
      { data: { records: [DNS_RECORD], page: 1, pages: 1, perPage: 10, total: 1 } },
      { data: { records: [DNS_RECORD], page: 1, pages: 1, perPage: 1, total: 1 } },
    ]);
    const result = await client.getAll("example.com");
    expect(result).toHaveLength(1);
  });

  test("add sends POST with DNS record", async () => {
    const spy = mockFetch({ ...DNS_RECORD, recordId: 42 });
    const newRecord = {
      name: "example.com.",
      type: DNSRecordTypes.A,
      address: "5.6.7.8",
      ttl: 300,
    };
    const result = await client.add("example.com", newRecord);

    expect(result.recordId).toBe(42);
    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("POST");
    expect(url).toContain("/example.com/dns");
    expect(JSON.parse(init.body as string).address).toBe("5.6.7.8");
  });

  test("add throws when domainName is empty", async () => {
    await expect(client.add("", DNS_RECORD as never)).rejects.toThrow(
      new ValidationError("domainName is required"),
    );
  });

  test("add throws when record is null", async () => {
    await expect(client.add("example.com", null as never)).rejects.toThrow(
      new ValidationError("record is required"),
    );
  });

  test("edit sends POST to record URL", async () => {
    const spy = mockFetch(DNS_RECORD);
    await client.edit("example.com", { ...DNS_RECORD, address: "9.9.9.9" });

    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("POST");
    expect(url).toContain("/example.com/dns/1");
  });

  test("edit throws when record is null", async () => {
    await expect(client.edit("example.com", null as never)).rejects.toThrow(
      new ValidationError("record is required"),
    );
  });

  test("edit throws when recordId is missing", async () => {
    await expect(
      client.edit("example.com", { name: "example.com.", type: "A" as never, ttl: 300 } as never),
    ).rejects.toThrow(new ValidationError("record.recordId is required"));
  });

  test("remove sends DELETE to correct URL", async () => {
    const spy = mockFetchEmpty(204);
    await client.remove("example.com", 1);

    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("DELETE");
    expect(url).toContain("/example.com/dns/1");
  });

  test("remove throws when domainName is empty", async () => {
    await expect(client.remove("", 1)).rejects.toThrow(
      new ValidationError("domainName is required"),
    );
  });
});

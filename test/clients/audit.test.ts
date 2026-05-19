import { describe, expect, test } from "bun:test";
import { AuditClient } from "@src/clients/audit.js";
import { makeOptions, mockFetch } from "../helpers.js";

const client = new AuditClient(makeOptions());

const DISK_EVENT = {
  uniqId: "evt1",
  date: "2024-01-01T00:00:00Z",
  eventType: "create",
  userUid: 100,
  userLogin: "user@example.com",
  orgId: 12345,
  path: "/disk/file.txt",
  size: 1024,
};

describe("AuditClient", () => {
  test("getDiskLog returns EventList", async () => {
    mockFetch({ events: [DISK_EVENT], nextPageToken: "tok123" });
    const result = await client.getDiskLog({ pageSize: 10 });

    expect(result.events).toHaveLength(1);
    expect(result.events[0]?.uniqId).toBe("evt1");
    expect(result.nextPageToken).toBe("tok123");
  });

  test("getDiskLog sends correct URL with pageSize", async () => {
    const spy = mockFetch({ events: [], nextPageToken: undefined });
    await client.getDiskLog({ pageSize: 50 });

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("pageSize=50");
    expect(url).toContain("audit_log/disk");
  });

  test("getDiskLog includes pageToken when provided", async () => {
    const spy = mockFetch({ events: [] });
    await client.getDiskLog({ pageSize: 10, pageToken: "cursor_abc" });

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("pageToken=cursor_abc");
  });

  test("getDiskLog includes beforeDate in ISO format", async () => {
    const spy = mockFetch({ events: [] });
    await client.getDiskLog({ pageSize: 10, beforeDate: new Date("2024-06-01T12:00:00Z") });

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("beforeDate=2024-06-01T12%3A00%3A00Z");
  });

  test("getDiskLog includes afterDate in ISO format", async () => {
    const spy = mockFetch({ events: [] });
    await client.getDiskLog({ pageSize: 10, afterDate: new Date("2024-01-01T00:00:00Z") });

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("afterDate=2024-01-01T00%3A00%3A00Z");
  });

  test("getDiskLog includes includeUids", async () => {
    const spy = mockFetch({ events: [] });
    await client.getDiskLog({ pageSize: 10, includeUids: ["uid1", "uid2"] });

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("includeUids=uid1");
    expect(url).toContain("includeUids=uid2");
  });

  test("getDiskLog includes excludeUids", async () => {
    const spy = mockFetch({ events: [] });
    await client.getDiskLog({ pageSize: 10, excludeUids: ["uid3"] });

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("excludeUids=uid3");
  });

  test("getMailLog returns MailEventList", async () => {
    mockFetch({
      events: [{ messageId: "msg1", date: "2024-01-01T00:00:00Z", eventType: "receive" }],
      nextPageToken: null,
    });
    const result = await client.getMailLog({ pageSize: 10 });
    expect(result.events).toHaveLength(1);
  });

  test("getMailLog sends correct URL", async () => {
    const spy = mockFetch({ events: [] });
    await client.getMailLog({ pageSize: 20 });

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("audit_log/mail");
    expect(url).toContain("pageSize=20");
  });

  test("getMailLog includes event types filter", async () => {
    const spy = mockFetch({ events: [] });
    await client.getMailLog({ pageSize: 10, types: ["receive" as never, "send" as never] });

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("types=receive");
    expect(url).toContain("types=send");
  });
});

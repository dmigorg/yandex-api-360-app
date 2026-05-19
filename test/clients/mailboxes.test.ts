import { describe, expect, test } from "bun:test";
import { MailboxesClient } from "@src/clients/mailboxes.js";
import { ValidationError } from "@src/errors.js";
import { NotifyType, TaskStatus } from "@src/types/index.js";
import { makeOptions, mockFetch, mockFetchEmpty, mockFetchSequence } from "../helpers.js";

const client = new MailboxesClient(makeOptions());

const RESOURCE_SHORT = { resourceId: "1001", count: 0 };
const MAILBOX_INFO = {
  id: "1001",
  name: "Shared Box",
  description: "A shared mailbox",
  email: "shared@example.com",
  createdAt: "2023-01-01T00:00:00Z",
  updatedAt: "2023-01-01T00:00:00Z",
};

describe("MailboxesClient", () => {
  test("getDelegatedList returns array of resources", async () => {
    mockFetch({ resources: [RESOURCE_SHORT], total: 1, perPage: 10, page: 1, pages: 1 });
    const result = await client.getDelegatedList();

    expect(result).toHaveLength(1);
    expect(result[0]?.resourceId).toBe("1001");
  });

  test("getDelegatedList sends correct URL", async () => {
    const spy = mockFetch({ resources: [], total: 0, perPage: 10, page: 1, pages: 1 });
    await client.getDelegatedList(2, 25);

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("/mailboxes/delegated");
    expect(url).toContain("page=2");
    expect(url).toContain("perPage=25");
  });

  test("getAllDelegated fetches all when single page", async () => {
    mockFetchSequence([
      { data: { resources: [RESOURCE_SHORT], total: 1, perPage: 10, page: 1, pages: 1 } },
      { data: { resources: [RESOURCE_SHORT], total: 1, perPage: 1, page: 1, pages: 1 } },
    ]);
    const result = await client.getAllDelegated();
    expect(result).toHaveLength(1);
  });

  test("getList returns shared mailboxes", async () => {
    mockFetch({ resources: [RESOURCE_SHORT], total: 1, perPage: 10, page: 1, pages: 1 });
    const result = await client.getList();

    expect(result).toHaveLength(1);
  });

  test("getList calls correct URL", async () => {
    const spy = mockFetch({ resources: [], total: 0, perPage: 10, page: 1, pages: 1 });
    await client.getList(1, 10);

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("/mailboxes/shared");
  });

  test("add sends PUT and returns resourceId", async () => {
    const spy = mockFetch({ resourceId: "2002" });
    const result = await client.add("shared@example.com", "Shared Box", "A shared mailbox");

    expect(result).toBe("2002");
    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("PUT");
    const body = JSON.parse(init.body as string);
    expect(body.email).toBe("shared@example.com");
    expect(body.name).toBe("Shared Box");
  });

  test("add throws when email is empty", async () => {
    await expect(client.add("", "name", "desc")).rejects.toThrow(
      new ValidationError("email is required"),
    );
  });

  test("add throws when name is empty", async () => {
    await expect(client.add("e@x.com", "", "desc")).rejects.toThrow(
      new ValidationError("name is required"),
    );
  });

  test("add throws when description is empty", async () => {
    await expect(client.add("e@x.com", "name", "")).rejects.toThrow(
      new ValidationError("description is required"),
    );
  });

  test("getInfo returns MailboxInfo", async () => {
    mockFetch(MAILBOX_INFO);
    const result = await client.getInfo("1001");

    expect(result.name).toBe("Shared Box");
    expect(result.id).toBe("1001");
  });

  test("getInfo calls correct URL", async () => {
    const spy = mockFetch(MAILBOX_INFO);
    await client.getInfo("1001");

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("/mailboxes/shared/1001");
  });

  test("getInfo throws when id is empty", async () => {
    await expect(client.getInfo("")).rejects.toThrow(new ValidationError("id is required"));
  });

  test("setInfo sends PUT and returns resourceId", async () => {
    const spy = mockFetch({ resourceId: "1001" });
    const result = await client.setInfo("1001", "New Name", "New Desc");

    expect(result).toBe("1001");
    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("PUT");
  });

  test("remove sends DELETE to correct URL", async () => {
    const spy = mockFetchEmpty(204);
    await client.remove("1001");

    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("DELETE");
    expect(url).toContain("/mailboxes/shared/1001");
  });

  test("remove throws when id is empty", async () => {
    await expect(client.remove("")).rejects.toThrow(new ValidationError("id is required"));
  });

  test("getActors returns actor list", async () => {
    mockFetch({ actors: [{ actorId: "42", roles: ["send_on_behalf"] }] });
    const result = await client.getActors("1001");

    expect(result).toHaveLength(1);
    expect(result[0]?.actorId).toBe("42");
  });

  test("getActors calls correct URL", async () => {
    const spy = mockFetch({ actors: [] });
    await client.getActors("1001");

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("/mailboxes/actors/1001");
  });

  test("getActors throws when id is empty", async () => {
    await expect(client.getActors("")).rejects.toThrow(new ValidationError("id is required"));
  });

  test("getMailboxesFromUser returns resource list", async () => {
    mockFetch({ resources: [{ resourceId: "1001", type: "shared" }] });
    const result = await client.getMailboxesFromUser("42");

    expect(result).toHaveLength(1);
  });

  test("delegateAllow sends PUT and returns resourceId", async () => {
    const spy = mockFetch({ resourceId: "1001" });
    const result = await client.delegateAllow("1001");

    expect(result).toBe("1001");
    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("PUT");
    expect(url).toContain("/mailboxes/delegated");
  });

  test("delegateDeny sends DELETE to correct URL", async () => {
    const spy = mockFetchEmpty(204);
    await client.delegateDeny("1001");

    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("DELETE");
    expect(url).toContain("/mailboxes/delegated/1001");
  });

  test("setRules sends POST with roles and returns taskId", async () => {
    const spy = mockFetch({ taskId: "task123" });
    const result = await client.setRules("1001", "42", ["send_on_behalf" as never]);

    expect(result).toBe("task123");
    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("POST");
    expect(url).toContain("/mailboxes/set/1001");
    expect(url).toContain("actorId=42");
  });

  test("setRules omits notify param when it's 'all'", async () => {
    const spy = mockFetch({ taskId: "t1" });
    await client.setRules("1001", "42", [], NotifyType.All);

    const [url] = spy.mock.calls[0] as [string];
    expect(url).not.toContain("notify=");
  });

  test("setRules includes notify param when not 'all'", async () => {
    const spy = mockFetch({ taskId: "t1" });
    await client.setRules("1001", "42", [], NotifyType.None);

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("notify=none");
  });

  test("setRules throws when resourceId is empty", async () => {
    await expect(client.setRules("", "42", [])).rejects.toThrow(
      new ValidationError("resourceId is required"),
    );
  });

  test("setRules throws when actorId is empty", async () => {
    await expect(client.setRules("1001", "", [])).rejects.toThrow(
      new ValidationError("actorId is required"),
    );
  });

  test("getTaskStatus returns task status", async () => {
    mockFetch({ status: TaskStatus.Complete });
    const result = await client.getTaskStatus("task123");

    expect(result).toBe(TaskStatus.Complete);
  });

  test("getTaskStatus calls correct URL", async () => {
    const spy = mockFetch({ status: "running" });
    await client.getTaskStatus("task123");

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("/mailboxes/tasks/task123");
  });

  test("getTaskStatus throws when taskId is empty", async () => {
    await expect(client.getTaskStatus("")).rejects.toThrow(
      new ValidationError("taskId is required"),
    );
  });
});

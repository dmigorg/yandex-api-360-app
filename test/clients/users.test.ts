import { describe, expect, test } from "bun:test";
import { UsersClient } from "@src/clients/users.js";
import { ValidationError } from "@src/errors.js";
import { makeOptions, mockFetch, mockFetchEmpty, mockFetchSequence } from "../helpers.js";

const client = new UsersClient(makeOptions());

const USER = {
  id: 100,
  nickname: "jdoe",
  name: { first: "John", last: "Doe", middle: "" },
  email: "jdoe@example.com",
  isAdmin: false,
  isEnabled: true,
  isRobot: false,
  isDismissed: false,
  departmentId: 1,
  about: "",
  birthday: "",
  contacts: [],
  aliases: [],
  gender: "male",
  language: "ru",
  position: "Developer",
  timezone: "Europe/Moscow",
  createdAt: "2023-01-01T00:00:00Z",
  updatedAt: "2023-01-01T00:00:00Z",
};

describe("UsersClient", () => {
  test("getList returns paginated users", async () => {
    mockFetch({ users: [USER], page: 1, pages: 1, perPage: 10, total: 1 });
    const result = await client.getList();

    expect(result.users).toHaveLength(1);
    expect(result.users[0]?.nickname).toBe("jdoe");
  });

  test("getList sends correct pagination params", async () => {
    const spy = mockFetch({ users: [], page: 3, pages: 5, perPage: 50, total: 250 });
    await client.getList(3, 50);

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("page=3");
    expect(url).toContain("perPage=50");
  });

  test("getAll fetches all pages and merges results", async () => {
    const user2 = { ...USER, id: 101, nickname: "asmith" };
    mockFetchSequence([
      { data: { users: [USER], page: 1, pages: 2, perPage: 1, total: 2 } },
      { data: { users: [user2], page: 2, pages: 2, perPage: 1, total: 2 } },
    ]);
    const result = await client.getAll();

    expect(result).toHaveLength(2);
    expect(result[1]?.nickname).toBe("asmith");
  });

  test("getAll returns single page when pages=1", async () => {
    mockFetch({ users: [USER], page: 1, pages: 1, perPage: 1000, total: 1 });
    const result = await client.getAll();

    expect(result).toHaveLength(1);
  });

  test("getById returns user", async () => {
    mockFetch(USER);
    const result = await client.getById(100);

    expect(result.id).toBe(100);
    expect(result.email).toBe("jdoe@example.com");
  });

  test("getById calls correct URL", async () => {
    const spy = mockFetch(USER);
    await client.getById(100);

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("/users/100");
  });

  test("add sends POST with user data", async () => {
    const spy = mockFetch(USER);
    const newUser = {
      nickname: "jdoe",
      departmentId: 1,
      name: { first: "John", last: "Doe" },
      password: "pass123",
    };
    await client.add(newUser as never);

    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body as string).nickname).toBe("jdoe");
  });

  test("add throws when user is null", async () => {
    await expect(client.add(null as never)).rejects.toThrow(
      new ValidationError("user is required"),
    );
  });

  test("edit sends PATCH with non-null fields only", async () => {
    const spy = mockFetch(USER);
    await client.edit({ id: 100, position: "Senior Developer", password: undefined });

    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("PATCH");
    expect(url).toContain("/users/100");
    const body = JSON.parse(init.body as string);
    expect(body.position).toBe("Senior Developer");
    expect(body).not.toHaveProperty("password");
  });

  test("edit throws when user is null", async () => {
    await expect(client.edit(null as never)).rejects.toThrow(
      new ValidationError("user is required"),
    );
  });

  test("editFromUser sends PATCH with mapped fields", async () => {
    const spy = mockFetch(USER);
    await client.editFromUser(USER, "newpassword");

    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("PATCH");
    const body = JSON.parse(init.body as string);
    expect(body.password).toBe("newpassword");
  });

  test("editFromUser throws when user is null", async () => {
    await expect(client.editFromUser(null as never)).rejects.toThrow(
      new ValidationError("user is required"),
    );
  });

  test("addAlias sends POST and returns user", async () => {
    const spy = mockFetch(USER);
    const result = await client.addAlias(100, "johnd");

    expect(result.id).toBe(100);
    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("POST");
    expect(url).toContain("/users/100/aliases");
    expect(JSON.parse(init.body as string)).toEqual({ alias: "johnd" });
  });

  test("addAlias throws when alias is empty", async () => {
    await expect(client.addAlias(100, "")).rejects.toThrow(
      new ValidationError("alias is required"),
    );
  });

  test("deleteAlias sends DELETE and returns boolean", async () => {
    const spy = mockFetch({ removed: true });
    const result = await client.deleteAlias(100, "johnd");

    expect(result).toBe(true);
    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("DELETE");
    expect(url).toContain("/users/100/aliases/johnd");
  });

  test("deleteAlias throws when alias is empty", async () => {
    await expect(client.deleteAlias(100, "")).rejects.toThrow(
      new ValidationError("alias is required"),
    );
  });

  test("updateContacts sends PUT with contacts list", async () => {
    const spy = mockFetch(USER);
    await client.updateContacts(100, [
      { type: "email" as never, value: "alt@example.com", label: "Alt" },
    ]);

    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("PUT");
    expect(url).toContain("/users/100/contacts");
  });

  test("deleteContacts sends DELETE and returns user", async () => {
    const spy = mockFetch(USER);
    const result = await client.deleteContacts(100);

    expect(result.id).toBe(100);
    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("DELETE");
    expect(url).toContain("/users/100/contacts");
  });

  test("getStatus2FA returns boolean", async () => {
    mockFetch({ has2fa: true });
    const result = await client.getStatus2FA(100);

    expect(result).toBe(true);
  });

  test("getStatus2FA calls correct URL", async () => {
    const spy = mockFetch({ has2fa: false });
    await client.getStatus2FA(100);

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("/users/100/2fa");
  });

  test("clear2FA sends DELETE to 2fa URL", async () => {
    const spy = mockFetchEmpty(204);
    await client.clear2FA(100);

    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("DELETE");
    expect(url).toContain("/users/100/2fa");
  });

  test("getDomain2fa returns UserDomain2FA", async () => {
    mockFetch({ id: "100", is2faEnabled: true });
    const result = await client.getDomain2fa(100);

    expect(result.id).toBe("100");
    expect(result.is2faEnabled).toBe(true);
  });

  test("updateDomain2fa sends PATCH with flag", async () => {
    const spy = mockFetch({});
    await client.updateDomain2fa(100, true);

    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("PATCH");
    expect(url).toContain("/users/100/domain_2fa");
    expect(url).toContain("is2faEnabled=true");
  });

  test("setAvatar sends PUT with binary data", async () => {
    const spy = mockFetch({ url: "https://avatars.yandex.net/100.png" });
    const buf = new ArrayBuffer(16);
    const result = await client.setAvatar(100, buf);

    expect(result).toBe("https://avatars.yandex.net/100.png");
    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("PUT");
    expect(url).toContain("/users/100/avatar");
    expect((init.headers as Record<string, string>)["Content-Type"]).toBe("image/png");
  });

  test("setAvatar throws when imageData is null", async () => {
    await expect(client.setAvatar(100, null as never)).rejects.toThrow(
      new ValidationError("imageData is required"),
    );
  });
});

import { describe, expect, test } from "bun:test";
import { GroupsClient } from "@src/clients/groups.js";
import { ValidationError } from "@src/errors.js";
import { MemberTypes } from "@src/types/index.js";
import { makeOptions, mockFetch, mockFetchSequence } from "../helpers.js";

const client = new GroupsClient(makeOptions());

const GROUP = {
  id: 1,
  name: "Developers",
  description: "Dev team",
  label: "devs",
  externalId: undefined,
  members: [],
  adminIds: [],
  type: "generic",
  membersCount: 5,
  email: "devs@example.com",
  aliases: [],
  removed: false,
  authorId: 100,
  memberOf: [],
  createdAt: "2023-01-01T00:00:00Z",
};

describe("GroupsClient", () => {
  test("getList returns paginated groups", async () => {
    mockFetch({ groups: [GROUP], page: 1, pages: 1, perPage: 10, total: 1 });
    const result = await client.getList();

    expect(result.groups).toHaveLength(1);
    expect(result.groups[0]?.name).toBe("Developers");
  });

  test("getList sends correct pagination URL", async () => {
    const spy = mockFetch({ groups: [], page: 2, pages: 3, perPage: 50, total: 150 });
    await client.getList(2, 50);

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("page=2");
    expect(url).toContain("perPage=50");
  });

  test("getAll fetches all pages", async () => {
    const group2 = { ...GROUP, id: 2, name: "Designers" };
    mockFetchSequence([
      { data: { groups: [GROUP], page: 1, pages: 2, perPage: 1, total: 2 } },
      { data: { groups: [group2], page: 2, pages: 2, perPage: 1, total: 2 } },
    ]);
    const result = await client.getAll();

    expect(result).toHaveLength(2);
    expect(result[1]?.name).toBe("Designers");
  });

  test("getById returns group", async () => {
    mockFetch(GROUP);
    const result = await client.getById(1);
    expect(result.id).toBe(1);
  });

  test("getById calls correct URL", async () => {
    const spy = mockFetch(GROUP);
    await client.getById(5);

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("/groups/5");
  });

  test("add sends POST with group data", async () => {
    const spy = mockFetch(GROUP);
    await client.add({
      name: "QA",
      description: "Quality assurance",
      label: "qa",
      members: [],
      adminIds: [],
    });

    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body as string).name).toBe("QA");
  });

  test("add throws when group is null", async () => {
    await expect(client.add(null as never)).rejects.toThrow(
      new ValidationError("group is required"),
    );
  });

  test("edit sends PATCH to correct URL", async () => {
    const spy = mockFetch(GROUP);
    await client.edit({ ...GROUP, name: "Updated Developers" });

    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("PATCH");
    expect(url).toContain("/groups/1");
    expect(JSON.parse(init.body as string).name).toBe("Updated Developers");
  });

  test("remove sends DELETE and returns boolean", async () => {
    const spy = mockFetch({ removed: true });
    const result = await client.remove(1);

    expect(result).toBe(true);
    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("DELETE");
  });

  test("getMembers returns MembersList", async () => {
    const membersList = { users: [{ id: 10, type: "user" }], groups: [], departments: [] };
    mockFetch(membersList);
    const result = await client.getMembers(1);
    expect(result.users).toHaveLength(1);
  });

  test("getMembers calls correct URL", async () => {
    const spy = mockFetch({ users: [], groups: [], departments: [] });
    await client.getMembers(3);

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("/groups/3/members");
  });

  test("getMembers2 calls v2 URL", async () => {
    const spy = mockFetch({ users: [], groups: [], departments: [], externalContacts: [] });
    await client.getMembers2(3);

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("/v2/");
    expect(url).toContain("/groups/3/members");
  });

  test("addMember sends POST and returns true", async () => {
    const spy = mockFetch({ id: 10, type: "user", added: true });
    const result = await client.addMember(1, { id: 10, type: MemberTypes.user });

    expect(result).toBe(true);
    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("POST");
  });

  test("addMember throws when member is null", async () => {
    await expect(client.addMember(1, null as never)).rejects.toThrow(
      new ValidationError("member is required"),
    );
  });

  test("removeMember sends DELETE and returns boolean", async () => {
    const spy = mockFetch({ id: 10, type: "user", deleted: true });
    const result = await client.removeMember(1, { id: 10, type: MemberTypes.user });

    expect(result).toBe(true);
    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("DELETE");
    expect(url).toContain("/members/user/10");
  });

  test("removeAllMembers sends DELETE to members URL", async () => {
    const spy = mockFetch({ users: [], groups: [], departments: [] });
    await client.removeAllMembers(1);

    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("DELETE");
    expect(url).toContain("/groups/1/members");
  });

  test("removeAllManagers sends DELETE to admins URL", async () => {
    const spy = mockFetch(GROUP);
    await client.removeAllManagers(1);

    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("DELETE");
    expect(url).toContain("/groups/1/admins");
  });

  test("editManagers sends PUT with adminIds", async () => {
    const spy = mockFetch(GROUP);
    await client.editManagers(1, [10, 20]);

    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("PUT");
    expect(url).toContain("/groups/1/admins");
    expect(JSON.parse(init.body as string)).toEqual({ adminIds: [10, 20] });
  });

  test("editMembers sends PUT with members", async () => {
    const spy = mockFetch({ users: [], groups: [], departments: [] });
    await client.editMembers(1, [{ id: 10, type: MemberTypes.user }]);

    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("PUT");
    expect(url).toContain("/groups/1/members");
  });

  test("addMembers sends PATCH to v2 URL with userIds", async () => {
    const spy = mockFetch({});
    const result = await client.addMembers(1, { userIds: ["10", "20"] });

    expect(result).toBe(true);
    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("PATCH");
    expect(url).toContain("/v2/");
    expect(url).toContain("/members/add");
    expect(JSON.parse(init.body as string).userIds).toEqual(["10", "20"]);
  });

  test("removeMembers sends PATCH to v2 delete URL", async () => {
    const spy = mockFetch({});
    await client.removeMembers(1, { userIds: ["10"] });

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("/members/delete");
  });

  test("addMembersList converts Member[] to typed IDs", async () => {
    const spy = mockFetch({});
    await client.addMembersList(1, [
      { id: 10, type: MemberTypes.user },
      { id: 3, type: MemberTypes.department },
    ]);

    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(init.body as string);
    expect(body.userIds).toEqual(["10"]);
    expect(body.departmentIds).toEqual([3]);
  });
});

import { describe, expect, test } from "bun:test";
import { DepartmentsClient } from "@src/clients/departments.js";
import { ValidationError } from "@src/errors.js";
import { DepartmentsOrderBy } from "@src/types/index.js";
import { makeOptions, mockFetch, mockFetchSequence } from "../helpers.js";

const client = new DepartmentsClient(makeOptions());

const DEPT = {
  id: 1,
  name: "Engineering",
  parentId: 0,
  membersCount: 10,
  email: "eng@example.com",
  aliases: [],
  createdAt: "2023-01-01T00:00:00Z",
};

describe("DepartmentsClient", () => {
  test("getList returns paginated departments", async () => {
    mockFetch({ departments: [DEPT], page: 1, pages: 1, perPage: 10, total: 1 });
    const result = await client.getList();

    expect(result.departments).toHaveLength(1);
    expect(result.departments[0]?.name).toBe("Engineering");
  });

  test("getList sends correct URL with pagination params", async () => {
    const spy = mockFetch({ departments: [], page: 2, pages: 2, perPage: 20, total: 30 });
    await client.getList(2, 20);

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("page=2");
    expect(url).toContain("perPage=20");
  });

  test("getList sends parentId when provided", async () => {
    const spy = mockFetch({ departments: [], page: 1, pages: 1, perPage: 10, total: 0 });
    await client.getList(1, 10, 5);

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("parentId=5");
  });

  test("getList sends orderBy param", async () => {
    const spy = mockFetch({ departments: [], page: 1, pages: 1, perPage: 10, total: 0 });
    await client.getList(1, 10, undefined, DepartmentsOrderBy.name);

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("orderBy=name");
  });

  test("getAll fetches single page when pages=1", async () => {
    mockFetch({ departments: [DEPT], page: 1, pages: 1, perPage: 1000, total: 1 });
    const result = await client.getAll();

    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe(1);
  });

  test("getAll fetches multiple pages and combines results", async () => {
    const dept2 = { ...DEPT, id: 2, name: "Design" };
    mockFetchSequence([
      { data: { departments: [DEPT], page: 1, pages: 2, perPage: 1, total: 2 } },
      { data: { departments: [dept2], page: 2, pages: 2, perPage: 1, total: 2 } },
    ]);
    const result = await client.getAll();

    expect(result).toHaveLength(2);
    expect(result[1]?.name).toBe("Design");
  });

  test("getById returns department", async () => {
    mockFetch(DEPT);
    const result = await client.getById(1);

    expect(result.id).toBe(1);
    expect(result.name).toBe("Engineering");
  });

  test("getById calls correct URL", async () => {
    const spy = mockFetch(DEPT);
    await client.getById(7);

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("/departments/7");
  });

  test("add sends POST with department data", async () => {
    const spy = mockFetch(DEPT);
    await client.add({ name: "Marketing", parentId: 0 });

    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body as string).name).toBe("Marketing");
  });

  test("add throws when department is null", async () => {
    await expect(client.add(null as never)).rejects.toThrow(
      new ValidationError("department is required"),
    );
  });

  test("edit sends PATCH to correct URL", async () => {
    const spy = mockFetch(DEPT);
    await client.edit({ id: 1, name: "Engineering Team" });

    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("PATCH");
    expect(url).toContain("/departments/1");
    expect(JSON.parse(init.body as string).name).toBe("Engineering Team");
  });

  test("remove sends DELETE and returns boolean", async () => {
    const spy = mockFetch({ removed: true });
    const result = await client.remove(1);

    expect(result).toBe(true);
    const [, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("DELETE");
  });

  test("remove returns false when not removed", async () => {
    mockFetch({ removed: false });
    const result = await client.remove(99);
    expect(result).toBe(false);
  });

  test("addAlias sends POST with alias", async () => {
    const spy = mockFetch(DEPT);
    await client.addAlias(1, "eng");

    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("POST");
    expect(url).toContain("/departments/1/aliases");
    expect(JSON.parse(init.body as string)).toEqual({ alias: "eng" });
  });

  test("addAlias throws when alias is empty", async () => {
    await expect(client.addAlias(1, "")).rejects.toThrow(new ValidationError("alias is required"));
  });

  test("deleteAlias sends DELETE and returns boolean", async () => {
    const spy = mockFetch({ removed: true });
    const result = await client.deleteAlias(1, "eng");

    expect(result).toBe(true);
    const [url, init] = spy.mock.calls[0] as [string, RequestInit];
    expect(init.method).toBe("DELETE");
    expect(url).toContain("/departments/1/aliases/eng");
  });

  test("deleteAlias throws when alias is empty", async () => {
    await expect(client.deleteAlias(1, "")).rejects.toThrow(
      new ValidationError("alias is required"),
    );
  });
});

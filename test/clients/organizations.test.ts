import { describe, expect, test } from "bun:test";
import { OrganizationsClient } from "@src/clients/organizations.js";
import { makeOptions, mockFetch, mockFetchSequence } from "../helpers.js";

const client = new OrganizationsClient(makeOptions());

const ORG = { id: 12345, name: "My Company", subdomain: "mycompany" };

describe("OrganizationsClient", () => {
  test("getList returns organization list", async () => {
    mockFetch({ organizations: [ORG], nextPageToken: null });
    const result = await client.getList();

    expect(result.organizations).toHaveLength(1);
    expect(result.organizations[0]?.id).toBe(12345);
  });

  test("getList sends pageSize param", async () => {
    const spy = mockFetch({ organizations: [], nextPageToken: null });
    await client.getList(50);

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("pageSize=50");
    expect(url).toContain("/directory/v1/org");
  });

  test("getList includes pageToken when provided", async () => {
    const spy = mockFetch({ organizations: [], nextPageToken: null });
    await client.getList(10, "cursor_xyz");

    const [url] = spy.mock.calls[0] as [string];
    expect(url).toContain("pageToken=cursor_xyz");
  });

  test("getAll returns all orgs from single page", async () => {
    mockFetch({ organizations: [ORG], nextPageToken: null });
    const result = await client.getAll();

    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("My Company");
  });

  test("getAll follows pagination via nextPageToken", async () => {
    const org2 = { id: 99999, name: "Second Org", subdomain: "second" };
    mockFetchSequence([
      { data: { organizations: [ORG], nextPageToken: "tok_page2" } },
      { data: { organizations: [org2], nextPageToken: null } },
    ]);
    const result = await client.getAll();

    expect(result).toHaveLength(2);
    expect(result[1]?.name).toBe("Second Org");
  });

  test("getAll returns empty array when no orgs", async () => {
    mockFetch({ organizations: [], nextPageToken: null });
    const result = await client.getAll();
    expect(result).toHaveLength(0);
  });
});

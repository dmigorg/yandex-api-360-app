import { describe, expect, test } from "bun:test";
import { Api360Options } from "@src/options.js";

const ORG = "org123";
const TOKEN = "token456";

describe("Api360Options", () => {
  test("throws when organizationId is empty", () => {
    expect(() => new Api360Options({ organizationId: "", token: TOKEN })).toThrow(
      "organizationId is required",
    );
  });

  test("throws when token is empty", () => {
    expect(() => new Api360Options({ organizationId: ORG, token: "" })).toThrow(
      "token is required",
    );
  });

  test("uses default baseUrl", () => {
    const opts = new Api360Options({ organizationId: ORG, token: TOKEN });
    expect(opts.urlUsers).toStartWith("https://api360.yandex.net");
  });

  test("uses custom baseUrl", () => {
    const opts = new Api360Options({
      organizationId: ORG,
      token: TOKEN,
      baseUrl: "https://custom.example.com",
    });
    expect(opts.urlUsers).toStartWith("https://custom.example.com");
  });

  test("uses default maxResponseCount = 1000", () => {
    const opts = new Api360Options({ organizationId: ORG, token: TOKEN });
    expect(opts.maxResponseCount).toBe(1000);
  });

  test("respects custom maxResponseCount", () => {
    const opts = new Api360Options({ organizationId: ORG, token: TOKEN, maxResponseCount: 500 });
    expect(opts.maxResponseCount).toBe(500);
  });

  test("builds urlUsers correctly", () => {
    const opts = new Api360Options({ organizationId: ORG, token: TOKEN });
    expect(opts.urlUsers).toBe(`https://api360.yandex.net/directory/v1/org/${ORG}/users`);
  });

  test("builds urlDepartments correctly", () => {
    const opts = new Api360Options({ organizationId: ORG, token: TOKEN });
    expect(opts.urlDepartments).toBe(
      `https://api360.yandex.net/directory/v1/org/${ORG}/departments`,
    );
  });

  test("builds urlGroups correctly", () => {
    const opts = new Api360Options({ organizationId: ORG, token: TOKEN });
    expect(opts.urlGroups).toBe(`https://api360.yandex.net/directory/v1/org/${ORG}/groups`);
  });

  test("builds url2fa correctly", () => {
    const opts = new Api360Options({ organizationId: ORG, token: TOKEN });
    expect(opts.url2fa).toBe(`https://api360.yandex.net/security/v1/org/${ORG}/domain_2fa`);
  });

  test("builds urlAntispam correctly", () => {
    const opts = new Api360Options({ organizationId: ORG, token: TOKEN });
    expect(opts.urlAntispam).toBe(
      `https://api360.yandex.net/admin/v1/org/${ORG}/mail/antispam/allowlist/ips`,
    );
  });

  test("builds urlMailboxManagement correctly", () => {
    const opts = new Api360Options({ organizationId: ORG, token: TOKEN });
    expect(opts.urlMailboxManagement).toBe(
      `https://api360.yandex.net/admin/v1/org/${ORG}/mailboxes`,
    );
  });

  test("builds urlOrg correctly", () => {
    const opts = new Api360Options({ organizationId: ORG, token: TOKEN });
    expect(opts.urlOrg).toBe("https://api360.yandex.net/directory/v1/org");
  });

  test("maxCountOrgInResponse is 100", () => {
    const opts = new Api360Options({ organizationId: ORG, token: TOKEN });
    expect(opts.maxCountOrgInResponse).toBe(100);
  });
});

import { spyOn } from "bun:test";
import { Api360Options } from "@src/options.js";

export const TEST_ORG_ID = "12345";
export const TEST_TOKEN = "test-token";

export function makeOptions(
  overrides?: Partial<{ organizationId: string; token: string; baseUrl: string }>,
) {
  return new Api360Options({
    organizationId: overrides?.organizationId ?? TEST_ORG_ID,
    token: overrides?.token ?? TEST_TOKEN,
    baseUrl: overrides?.baseUrl ?? "https://api360.yandex.net",
  });
}

function getFetchSpy() {
  const spy = spyOn(globalThis, "fetch");
  spy.mockReset();
  return spy;
}

export function mockFetch(data: unknown, status = 200) {
  const spy = getFetchSpy();
  spy.mockResolvedValueOnce(
    new Response(JSON.stringify(data), {
      status,
      headers: { "Content-Type": "application/json" },
    }),
  );
  return spy;
}

export function mockFetchEmpty(status = 204) {
  const spy = getFetchSpy();
  spy.mockResolvedValueOnce(new Response(null, { status }));
  return spy;
}

export function mockFetchError(data: unknown, status: number) {
  const spy = getFetchSpy();
  spy.mockResolvedValueOnce(
    new Response(JSON.stringify(data), {
      status,
      headers: { "Content-Type": "application/json" },
    }),
  );
  return spy;
}

export function mockFetchSequence(responses: Array<{ data: unknown; status?: number }>) {
  const spy = getFetchSpy();
  for (const r of responses) {
    spy.mockResolvedValueOnce(
      new Response(JSON.stringify(r.data), {
        status: r.status ?? 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
  }
  return spy;
}

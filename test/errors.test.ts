import { describe, expect, test } from "bun:test";
import { APIRequestError, ValidationError } from "@src/errors.js";

describe("APIRequestError", () => {
  test("constructs from statusCode + FailedAPIResponse", () => {
    const body = { code: 403, message: "Forbidden", details: [] };
    const err = new APIRequestError(403, body);

    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(APIRequestError);
    expect(err.name).toBe("APIRequestError");
    expect(err.statusCode).toBe(403);
    expect(err.errorData).toEqual(body);
    expect(err.message).toBe(JSON.stringify(body));
  });

  test("constructs from message + statusCode", () => {
    const err = new APIRequestError("Not found", 404);

    expect(err.name).toBe("APIRequestError");
    expect(err.statusCode).toBe(404);
    expect(err.errorData).toBeUndefined();
    expect(err.message).toBe("Not found");
  });

  test("includes details in errorData", () => {
    const body = {
      code: 400,
      message: "Bad request",
      details: [{ "@type": "type.googleapis.com/google.rpc.RequestInfo", requestId: "abc" }],
    };
    const err = new APIRequestError(400, body);

    expect(err.errorData?.details).toHaveLength(1);
    expect(err.errorData?.details?.[0]?.requestId).toBe("abc");
  });
});

describe("ValidationError", () => {
  test("is an instance of Error", () => {
    const err = new ValidationError("something is required");

    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(ValidationError);
  });

  test("has correct name", () => {
    const err = new ValidationError("x is required");
    expect(err.name).toBe("ValidationError");
  });

  test("preserves message", () => {
    const err = new ValidationError("token is required");
    expect(err.message).toBe("token is required");
  });
});

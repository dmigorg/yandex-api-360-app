import { BaseClient } from "../base-client.js";
import { ValidationError } from "../errors.js";
import type { PasswordParameters } from "../types/index.js";

export class PasswordManagementClient extends BaseClient {
  /**
   * Returns the current password policy for the organization.
   * @returns Password policy with `enabled` flag and optional `changeFrequency` (days)
   * @throws {APIRequestError} On HTTP error response
   */
  async getParameters(): Promise<PasswordParameters> {
    return this.httpGet<PasswordParameters>(this.options.urlPasswords);
  }

  /**
   * Updates the password policy for the organization.
   * @param parameters - New password policy settings
   * @returns Updated password policy
   * @throws {ValidationError} If `parameters` is null or undefined
   * @throws {APIRequestError} On HTTP error response
   */
  async setParameters(parameters: PasswordParameters): Promise<PasswordParameters> {
    if (!parameters) throw new ValidationError("parameters is required");
    return this.httpPut<PasswordParameters>(this.options.urlPasswords, parameters);
  }
}

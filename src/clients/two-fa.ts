import { BaseClient } from "../base-client.js";
import { ValidationError } from "../errors.js";
import type {
  DomainStatus2FA,
  DomainStatus2FAV2,
  EnableDomainStatus2FA,
  EnableDomainStatus2FAV2,
} from "../types/index.js";

export class TwoFAClient extends BaseClient {
  /**
   * Returns the current domain-level 2FA status (v1).
   * @returns 2FA status with `enabled`, `duration`, and optional `enabledAt`
   * @throws {APIRequestError} On HTTP error response
   */
  async getStatus(): Promise<DomainStatus2FA> {
    return this.httpGet<DomainStatus2FA>(this.options.url2fa);
  }

  /**
   * Enables domain-level 2FA for all users (v1).
   * @param status2FA - Configuration: duration and whether to log out all users
   * @returns Updated 2FA status
   * @throws {ValidationError} If `status2FA` is null or undefined
   * @throws {APIRequestError} On insufficient permissions
   */
  async enable(status2FA: EnableDomainStatus2FA): Promise<DomainStatus2FA> {
    if (!status2FA) throw new ValidationError("status2FA is required");
    return this.httpPost<DomainStatus2FA>(this.options.url2fa, status2FA);
  }

  /**
   * Disables domain-level 2FA (v1).
   * @returns Updated 2FA status
   * @throws {APIRequestError} On HTTP error response
   */
  async disable(): Promise<DomainStatus2FA> {
    return this.httpDelete<DomainStatus2FA>(this.options.url2fa);
  }

  /**
   * Returns the current domain-level 2FA status (v2, supports `per_user` scope).
   * @returns 2FA status including `scope` field
   * @throws {APIRequestError} On HTTP error response
   */
  async getStatusV2(): Promise<DomainStatus2FAV2> {
    return this.httpGet<DomainStatus2FAV2>(this.options.url2faV2);
  }

  /**
   * Enables 2FA with v2 options including `scope` (`per_domain` or `per_user`).
   * @param status2FA - Configuration including optional `scope` and `validationMethod`
   * @returns Updated 2FA status
   * @throws {ValidationError} If `status2FA` is null or undefined
   * @throws {APIRequestError} On insufficient permissions or unsupported plan
   */
  async enableV2(status2FA: EnableDomainStatus2FAV2): Promise<DomainStatus2FAV2> {
    if (!status2FA) throw new ValidationError("status2FA is required");
    return this.httpPost<DomainStatus2FAV2>(this.options.url2faV2, status2FA);
  }

  /**
   * Disables 2FA for the domain (v2).
   * @returns Updated 2FA status
   * @throws {APIRequestError} On HTTP error response
   */
  async disableV2(): Promise<DomainStatus2FAV2> {
    return this.httpDelete<DomainStatus2FAV2>(this.options.url2faV2);
  }
}

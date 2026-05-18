import { BaseClient } from "../base-client.js";
import type { OauthRestrictionStatus } from "../types/index.js";

export class OauthRestrictionsClient extends BaseClient {
  /**
   * Returns the current OAuth access restriction status for the organization.
   * @returns Object with `restricted` boolean flag
   */
  async getStatus(): Promise<OauthRestrictionStatus> {
    return this.httpGet<OauthRestrictionStatus>(this.options.urlOauthRestrictions);
  }

  /**
   * Enables the restriction of third-party OAuth application authorization for the organization.
   */
  async enable(): Promise<void> {
    await this.httpPost<unknown>(this.options.urlOauthRestrictions, {});
  }

  /**
   * Disables the restriction of third-party OAuth application authorization for the organization.
   */
  async disable(): Promise<void> {
    await this.httpDelete(this.options.urlOauthRestrictions);
  }
}

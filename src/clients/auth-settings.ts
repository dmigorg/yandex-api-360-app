import { BaseClient } from "../base-client.js";
import type { CookiesSettings } from "../types/index.js";

export class AuthSettingsClient extends BaseClient {
  /**
   * Returns the session cookie TTL for the organization.
   * @returns Session TTL in seconds (0 = no limit)
   */
  async getAuthTtl(): Promise<number> {
    const result = await this.httpGet<CookiesSettings>(
      `${this.options.urlSecurity}/domain_sessions`,
    );
    return result.authTTL;
  }

  /**
   * Updates the session cookie TTL for the organization.
   * @param authTTL - Session TTL in seconds (0 = no limit)
   * @returns Updated TTL value
   */
  async setAuthTtl(authTTL: number): Promise<number> {
    const result = await this.httpPost<CookiesSettings>(
      `${this.options.urlSecurity}/domain_sessions`,
      { authTTL },
    );
    return result.authTTL;
  }

  /**
   * Terminates all active sessions for a user on all devices.
   * @param userId - User identifier
   */
  async logoutUser(userId: number): Promise<void> {
    await this.httpPut<unknown>(
      `${this.options.urlSecurity}/domain_sessions/users/${userId}/logout`,
    );
  }
}

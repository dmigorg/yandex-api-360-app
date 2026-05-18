import { BaseClient } from "../base-client.js";
import type { WhiteList } from "../types/index.js";

export class AntispamClient extends BaseClient {
  /**
   * Returns the current IP allowlist for the organization's antispam settings.
   * @returns Array of allowed IP addresses and CIDR subnets
   */
  async getAllowList(): Promise<string[]> {
    const result = await this.httpGet<WhiteList>(this.options.urlAntispam);
    return result.allowList;
  }

  /**
   * Replaces the IP allowlist for the organization's antispam settings.
   * @param allowList - List of IPv4/IPv6 addresses or CIDR subnets (e.g. `"77.88.21.249"`, `"2a02:6b8::/32"`)
   */
  async setAllowList(allowList: string[]): Promise<void> {
    await this.httpPost<unknown>(this.options.urlAntispam, { allowList });
  }

  /**
   * Deletes the entire IP allowlist for the organization's antispam settings.
   */
  async deleteAllowList(): Promise<void> {
    await this.httpDelete(this.options.urlAntispam);
  }
}

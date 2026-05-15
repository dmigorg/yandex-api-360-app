import { BaseClient } from "../base-client.js";
import type { Api360Options } from "../options.js";
import type { Domain, DomainConnectStatus, DomainList } from "../types/index.js";

export class DomainsClient extends BaseClient {
  constructor(options: Api360Options) {
    super(options);
  }

  /**
   * Returns paginated list of organization domains.
   * @param page - Page number (1-based)
   * @param perPage - Items per page (max 10)
   * @returns Paginated domain list
   */
  async getList(page = 1, perPage = 10): Promise<DomainList> {
    return this.httpGet<DomainList>(`${this.options.urlDomains}?page=${page}&perPage=${perPage}`);
  }

  /**
   * Returns all domains, fetching all pages automatically.
   * @returns Array of all domains
   */
  async getAll(): Promise<Domain[]> {
    const initial = await this.getList();
    const full = await this.getList(1, initial.total);
    if (full.perPage >= full.total) return full.domains;

    const result: Domain[] = [...full.domains];
    for (let i = 2; i <= full.pages; i++) {
      const page = await this.getList(i, full.perPage);
      result.push(...page.domains);
    }
    return result;
  }

  /**
   * Adds a new domain to the organization.
   * @param domainName - Full domain name (e.g. `example.com`)
   * @returns Created domain object
   * @throws {APIRequestError} On invalid domain or insufficient permissions
   */
  async add(domainName: string): Promise<Domain> {
    if (!domainName) throw new Error("domainName is required");
    return this.httpPost<Domain>(this.options.urlDomains, { domain: domainName });
  }

  /**
   * Removes a domain from the organization.
   * @param domainName - Full domain name to remove
   * @throws {APIRequestError} If domain cannot be removed (e.g. technical domain)
   */
  async remove(domainName: string): Promise<void> {
    if (!domainName) throw new Error("domainName is required");
    await this.httpDelete(`${this.options.urlDomains}/${domainName}`);
  }

  /**
   * Returns the connection status and verification methods for a domain.
   * @param domainName - Full domain name
   * @returns Domain connection status with confirmation methods
   */
  async getStatus(domainName: string): Promise<DomainConnectStatus> {
    return this.httpGet<DomainConnectStatus>(`${this.options.urlDomains}/${domainName}/status`);
  }

  /**
   * Returns the DKIM signature status for a domain.
   * @param domainName - Full domain name
   * @returns DKIM status object with `enabled` flag and `publicKey`
   */
  async getDKIMStatus(domainName: string): Promise<{ enabled: boolean; publicKey: string }> {
    return this.httpGet<{ enabled: boolean; publicKey: string }>(
      `${this.options.urlDomains}/${domainName}/dkim`,
    );
  }

  /**
   * Enables DKIM signing for a domain.
   * @param domainName - Full domain name
   * @throws {APIRequestError} On insufficient permissions or domain not found
   */
  async enableDKIM(domainName: string): Promise<void> {
    await this.httpPost<unknown>(`${this.options.urlDomains}/${domainName}/dkim/enable`, {});
  }

  /**
   * Disables DKIM signing for a domain.
   * @param domainName - Full domain name
   * @throws {APIRequestError} On insufficient permissions or domain not found
   */
  async disableDKIM(domainName: string): Promise<void> {
    await this.httpPost<unknown>(`${this.options.urlDomains}/${domainName}/dkim/disable`, {});
  }
}

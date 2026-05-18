import { BaseClient } from "../base-client.js";
import type { DNSList, DNSRecord } from "../types/index.js";

export class DNSClient extends BaseClient {
  /**
   * Returns a paginated list of DNS records for a domain.
   * @param domainName - Full domain name (e.g. `example.com`)
   * @param page - Page number (1-based)
   * @param perPage - Items per page
   * @returns Paginated DNS record list
   */
  async getList(domainName: string, page = 1, perPage = 10): Promise<DNSList> {
    return this.httpGet<DNSList>(
      `${this.options.urlDomains}/${domainName}/dns?page=${page}&perPage=${perPage}`,
    );
  }

  /**
   * Returns all DNS records for a domain, fetching all pages automatically.
   * @param domainName - Full domain name
   * @returns Array of all DNS records
   */
  async getAll(domainName: string): Promise<DNSRecord[]> {
    const initial = await this.getList(domainName);
    const full = await this.getList(domainName, 1, initial.total);
    if (full.perPage >= full.total) return full.records;

    const result: DNSRecord[] = [...full.records];
    for (let i = 2; i <= full.pages; i++) {
      const page = await this.getList(domainName, i, full.perPage);
      result.push(...page.records);
    }
    return result;
  }

  /**
   * Creates a new DNS record for a domain.
   * @param domainName - Full domain name
   * @param record - DNS record data to create
   * @returns Created DNS record with assigned `recordId`
   * @throws {APIRequestError} On validation error or insufficient permissions
   */
  async add(domainName: string, record: DNSRecord): Promise<DNSRecord> {
    if (!domainName) throw new Error("domainName is required");
    if (!record) throw new Error("record is required");
    return this.httpPost<DNSRecord>(`${this.options.urlDomains}/${domainName}/dns`, record);
  }

  /**
   * Updates an existing DNS record.
   * @param domainName - Full domain name
   * @param record - DNS record with updated fields; must include `recordId`
   * @returns Updated DNS record
   */
  async edit(domainName: string, record: DNSRecord): Promise<DNSRecord> {
    if (!record) throw new Error("record is required");
    if (record.recordId == null) throw new Error("record.recordId is required");
    return this.httpPost<DNSRecord>(
      `${this.options.urlDomains}/${domainName}/dns/${record.recordId}`,
      record,
    );
  }

  /**
   * Deletes a DNS record from a domain.
   * @param domainName - Full domain name
   * @param recordId - DNS record identifier
   */
  async remove(domainName: string, recordId: number): Promise<void> {
    if (!domainName) throw new Error("domainName is required");
    await this.httpDelete(`${this.options.urlDomains}/${domainName}/dns/${recordId}`);
  }
}

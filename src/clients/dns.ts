import { BaseClient } from "../base-client.js";
import { ValidationError } from "../errors.js";
import type { DNSList, DNSRecord } from "../types/index.js";

export class DNSClient extends BaseClient {
  /**
   * Returns a paginated list of DNS records for a domain.
   * @param domainName - Full domain name (e.g. `example.com`)
   * @param page - Page number (1-based)
   * @param perPage - Items per page
   * @returns Paginated DNS record list
   * @throws {APIRequestError} On HTTP error response
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
   * @throws {APIRequestError} On HTTP error response
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
   * @throws {ValidationError} If `domainName` or `record` is missing
   * @throws {APIRequestError} On HTTP error response
   */
  async add(domainName: string, record: DNSRecord): Promise<DNSRecord> {
    if (!domainName) throw new ValidationError("domainName is required");
    if (!record) throw new ValidationError("record is required");
    return this.httpPost<DNSRecord>(`${this.options.urlDomains}/${domainName}/dns`, record);
  }

  /**
   * Updates an existing DNS record.
   * @param domainName - Full domain name
   * @param record - DNS record with updated fields; must include `recordId`
   * @returns Updated DNS record
   * @throws {ValidationError} If `record` is null or `record.recordId` is missing
   * @throws {APIRequestError} On HTTP error response
   */
  async edit(domainName: string, record: DNSRecord): Promise<DNSRecord> {
    if (!record) throw new ValidationError("record is required");
    if (record.recordId == null) throw new ValidationError("record.recordId is required");
    return this.httpPost<DNSRecord>(
      `${this.options.urlDomains}/${domainName}/dns/${record.recordId}`,
      record,
    );
  }

  /**
   * Deletes a DNS record from a domain.
   * @param domainName - Full domain name
   * @param recordId - DNS record identifier
   * @throws {ValidationError} If `domainName` is empty
   * @throws {APIRequestError} On HTTP error response
   */
  async remove(domainName: string, recordId: number): Promise<void> {
    if (!domainName) throw new ValidationError("domainName is required");
    await this.httpDelete(`${this.options.urlDomains}/${domainName}/dns/${recordId}`);
  }
}

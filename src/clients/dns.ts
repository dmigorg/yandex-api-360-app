import { BaseClient } from "../base-client.js";
import type { Api360Options } from "../options.js";
import type { DNSList, DNSRecord } from "../types/index.js";

export class DNSClient extends BaseClient {
  constructor(options: Api360Options) {
    super(options);
  }

  async getList(domainName: string, page = 1, perPage = 10): Promise<DNSList> {
    return this.httpGet<DNSList>(
      `${this.options.urlDomains}/${domainName}/dns?page=${page}&perPage=${perPage}`,
    );
  }

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

  async add(domainName: string, record: DNSRecord): Promise<DNSRecord> {
    if (!domainName) throw new Error("domainName is required");
    if (!record) throw new Error("record is required");
    return this.httpPost<DNSRecord>(`${this.options.urlDomains}/${domainName}/dns`, record);
  }

  async edit(domainName: string, record: DNSRecord): Promise<DNSRecord> {
    if (!record) throw new Error("record is required");
    if (record.recordId == null) throw new Error("record.recordId is required");
    return this.httpPost<DNSRecord>(
      `${this.options.urlDomains}/${domainName}/dns/${record.recordId}`,
      record,
    );
  }

  async remove(domainName: string, recordId: number): Promise<void> {
    if (!domainName) throw new Error("domainName is required");
    await this.httpDelete(`${this.options.urlDomains}/${domainName}/dns/${recordId}`);
  }
}

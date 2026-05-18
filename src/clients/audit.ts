import { BaseClient } from "../base-client.js";
import type { EventList, MailEventList } from "../types/index.js";
import { MailEventType } from "../types/index.js";

export interface GetDiskLogParams {
  pageSize: number;
  pageToken?: string;
  beforeDate?: Date;
  afterDate?: Date;
  includeUids?: string[];
  excludeUids?: string[];
}

export interface GetMailLogParams {
  pageSize: number;
  pageToken?: string;
  beforeDate?: Date;
  afterDate?: Date;
  includeUids?: string[];
  excludeUids?: string[];
  types?: MailEventType[];
}

export class AuditClient extends BaseClient {
  /**
   * Returns the Disk audit log for the organization with cursor-based pagination.
   * @param params - Query parameters: required `pageSize`; optional date range, uid filters, page token
   * @returns Page of disk audit events with optional `nextPageToken`
   */
  async getDiskLog(params: GetDiskLogParams): Promise<EventList> {
    const url = new URL(`${this.options.urlSecurity}/audit_log/disk`);
    url.searchParams.set("pageSize", String(params.pageSize));
    if (params.pageToken) url.searchParams.set("pageToken", params.pageToken);
    if (params.beforeDate) {
      url.searchParams.set("beforeDate", params.beforeDate.toISOString().replace(/\.\d{3}Z$/, "Z"));
    }
    if (params.afterDate) {
      url.searchParams.set("afterDate", params.afterDate.toISOString().replace(/\.\d{3}Z$/, "Z"));
    }
    for (const uid of params.includeUids ?? []) url.searchParams.append("includeUids", uid);
    for (const uid of params.excludeUids ?? []) url.searchParams.append("excludeUids", uid);
    return this.httpGet<EventList>(url.toString());
  }

  /**
   * Returns the Mail audit log for the organization with cursor-based pagination.
   * @param params - Query parameters: required `pageSize`; optional date range, uid filters, event type filter, page token
   * @returns Page of mail audit events with optional `nextPageToken`
   */
  async getMailLog(params: GetMailLogParams): Promise<MailEventList> {
    const url = new URL(`${this.options.urlSecurity}/audit_log/mail`);
    url.searchParams.set("pageSize", String(params.pageSize));
    if (params.pageToken) url.searchParams.set("pageToken", params.pageToken);
    if (params.beforeDate) {
      url.searchParams.set("beforeDate", params.beforeDate.toISOString().replace(/\.\d{3}Z$/, "Z"));
    }
    if (params.afterDate) {
      url.searchParams.set("afterDate", params.afterDate.toISOString().replace(/\.\d{3}Z$/, "Z"));
    }
    for (const uid of params.includeUids ?? []) url.searchParams.append("includeUids", uid);
    for (const uid of params.excludeUids ?? []) url.searchParams.append("excludeUids", uid);
    for (const type of params.types ?? []) url.searchParams.append("types", type);
    return this.httpGet<MailEventList>(url.toString());
  }
}

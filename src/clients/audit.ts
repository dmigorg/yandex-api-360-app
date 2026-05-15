import { BaseClient } from "../base-client.js";
import type { Api360Options } from "../options.js";
import type { EventList } from "../types/index.js";

export interface GetDiskLogParams {
  pageSize: number;
  pageToken?: string;
  beforeDate?: Date;
  afterDate?: Date;
  includeUids?: string[];
  excludeUids?: string[];
}

export class AuditClient extends BaseClient {
  constructor(options: Api360Options) {
    super(options);
  }

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
}

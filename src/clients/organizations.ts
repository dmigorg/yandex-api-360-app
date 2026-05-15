import { BaseClient } from "../base-client.js";
import type { Api360Options } from "../options.js";
import type { Organization, OrganizationList } from "../types/index.js";

export class OrganizationsClient extends BaseClient {
  constructor(options: Api360Options) {
    super(options);
  }

  async getList(pageSize?: number, pageToken?: string): Promise<OrganizationList> {
    const url = new URL(this.options.urlOrg);
    url.searchParams.set("pageSize", String(pageSize ?? 10));
    if (pageToken) url.searchParams.set("pageToken", pageToken);
    return this.httpGet<OrganizationList>(url.toString());
  }

  async getAll(): Promise<Organization[]> {
    const result: Organization[] = [];
    let response = await this.getList(this.options.maxCountOrgInResponse);
    result.push(...response.organizations);
    while (response.nextPageToken) {
      response = await this.getList(this.options.maxCountOrgInResponse, response.nextPageToken);
      result.push(...response.organizations);
    }
    return result;
  }
}

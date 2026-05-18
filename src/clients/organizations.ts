import { BaseClient } from "../base-client.js";
import type { Organization, OrganizationList } from "../types/index.js";

export class OrganizationsClient extends BaseClient {
  /**
   * Returns a page of organizations accessible to the token.
   * @param pageSize - Maximum number of organizations per page (default: 10)
   * @param pageToken - Cursor token for the next page (from previous response)
   * @returns Paginated organization list with optional `nextPageToken`
   */
  async getList(pageSize?: number, pageToken?: string): Promise<OrganizationList> {
    const url = new URL(this.options.urlOrg);
    url.searchParams.set("pageSize", String(pageSize ?? 10));
    if (pageToken) url.searchParams.set("pageToken", pageToken);
    return this.httpGet<OrganizationList>(url.toString());
  }

  /**
   * Returns all organizations, fetching all pages automatically.
   * @returns Array of all organizations
   */
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

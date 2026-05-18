import { BaseClient } from "../base-client.js";
import type { ServiceApplication, ServiceApplicationsList } from "../types/index.js";

export class ServiceApplicationsClient extends BaseClient {
  /**
   * Returns the list of service applications and their scopes for the organization.
   * @returns List of service applications
   */
  async getList(): Promise<ServiceApplication[]> {
    const result = await this.httpGet<ServiceApplicationsList>(this.options.urlServiceApplications);
    return result.applications;
  }

  /**
   * Creates or replaces the list of service applications for the organization.
   * @param applications - New list of service applications with their scopes
   * @returns Updated list of service applications
   */
  async setList(applications: ServiceApplication[]): Promise<ServiceApplication[]> {
    if (!applications) throw new Error("applications is required");
    const result = await this.httpPost<ServiceApplicationsList>(
      this.options.urlServiceApplications,
      { applications },
    );
    return result.applications;
  }

  /**
   * Deletes all service applications for the organization.
   * @returns Remaining (empty) list of service applications
   */
  async deleteList(): Promise<ServiceApplication[]> {
    const result = await this.httpDelete<ServiceApplicationsList>(
      this.options.urlServiceApplications,
    );
    return result.applications;
  }

  /**
   * Enables the service applications feature for the organization.
   */
  async activate(): Promise<void> {
    await this.httpPost<unknown>(`${this.options.urlServiceApplications}/activate`, {});
  }

  /**
   * Disables the service applications feature for the organization.
   * After deactivation only `deleteList` remains available.
   */
  async deactivate(): Promise<void> {
    await this.httpPost<unknown>(`${this.options.urlServiceApplications}/deactivate`, {});
  }
}

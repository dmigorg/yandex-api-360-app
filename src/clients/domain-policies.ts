import { BaseClient } from "../base-client.js";
import type { DomainPolicy, PoliciesList } from "../types/index.js";

export class DomainPoliciesClient extends BaseClient {
  /**
   * Returns the list of domain mail policies (accept/reject rules by IP, domain, or sender).
   * @returns List of domain policies with revision number
   */
  async getRules(): Promise<PoliciesList> {
    return this.httpGet<PoliciesList>(this.options.urlDomainPolicies);
  }

  /**
   * Creates or replaces the list of domain mail policies.
   * @param rules - New list of domain policy rules
   */
  async setRules(rules: DomainPolicy[]): Promise<void> {
    await this.httpPut<unknown>(this.options.urlDomainPolicies, { rules });
  }
}

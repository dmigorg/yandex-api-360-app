import { BaseClient } from "../base-client.js";
import type { Rule, RulesList } from "../types/index.js";

export class RoutingClient extends BaseClient {
  /**
   * Returns the list of mail routing rules for the organization.
   * @returns Array of routing rules
   */
  async getRules(): Promise<Rule[]> {
    const result = await this.httpGet<RulesList>(this.options.urlRouting);
    return result.rules;
  }

  /**
   * Replaces the list of mail routing rules for the organization.
   * @param rulesList - New rules list
   */
  async setRules(rulesList: RulesList): Promise<void> {
    await this.httpPut<unknown>(this.options.urlRouting, rulesList);
  }
}

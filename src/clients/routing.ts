import { BaseClient } from "../base-client.js";
import type { Api360Options } from "../options.js";
import type { Rule, RulesList } from "../types/index.js";

export class RoutingClient extends BaseClient {
  constructor(options: Api360Options) {
    super(options);
  }

  async getRules(): Promise<Rule[]> {
    const result = await this.httpGet<RulesList>(this.options.urlRouting);
    return result.rules;
  }

  async setRules(rulesList: RulesList): Promise<Rule[]> {
    const result = await this.httpPut<RulesList>(this.options.urlRouting, rulesList);
    return result.rules;
  }
}

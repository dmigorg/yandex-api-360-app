import { BaseClient } from "../base-client.js";
import type { Api360Options } from "../options.js";
import type {
  CollectAddressStatus,
  UserPersonalSettings,
  UserRule,
  UserRuleAddResponse,
  UserRulesList,
} from "../types/index.js";

export class PostSettingsClient extends BaseClient {
  constructor(options: Api360Options) {
    super(options);
  }

  async getSenderInfo(userId: number): Promise<UserPersonalSettings> {
    return this.httpGet<UserPersonalSettings>(
      `${this.options.urlPostSettings}/users/${userId}/settings/sender_info`,
    );
  }

  async setSenderInfo(
    userId: number,
    settings: UserPersonalSettings,
  ): Promise<UserPersonalSettings> {
    if (!settings) throw new Error("settings is required");
    return this.httpPost<UserPersonalSettings>(
      `${this.options.urlPostSettings}/users/${userId}/settings/sender_info`,
      settings,
    );
  }

  async getCollectAddresses(userId: number): Promise<CollectAddressStatus> {
    return this.httpGet<CollectAddressStatus>(
      `${this.options.urlPostSettings}/users/${userId}/settings/address_book`,
    );
  }

  async setCollectAddresses(
    userId: number,
    status: CollectAddressStatus,
  ): Promise<CollectAddressStatus> {
    if (!status) throw new Error("status is required");
    return this.httpPost<CollectAddressStatus>(
      `${this.options.urlPostSettings}/users/${userId}/settings/address_book`,
      status,
    );
  }

  async getUserRules(userId: number): Promise<UserRulesList> {
    return this.httpGet<UserRulesList>(
      `${this.options.urlPostSettings}/users/${userId}/settings/user_rules`,
    );
  }

  async addUserRule(userId: number, rule: UserRule): Promise<number> {
    if (!rule) throw new Error("rule is required");
    const result = await this.httpPost<UserRuleAddResponse>(
      `${this.options.urlPostSettings}/users/${userId}/settings/user_rules`,
      rule,
    );
    return result.ruleId;
  }

  async deleteUserRule(userId: number, ruleId: number): Promise<void> {
    await this.httpDelete(
      `${this.options.urlPostSettings}/users/${userId}/settings/user_rules/${ruleId}`,
    );
  }
}

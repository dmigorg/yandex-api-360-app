import { BaseClient } from "../base-client.js";
import type {
  CollectAddressStatus,
  UserPersonalSettings,
  UserRule,
  UserRuleAddResponse,
  UserRulesList,
} from "../types/index.js";

export class PostSettingsClient extends BaseClient {
  /**
   * Returns the sender info settings (from-name, default from address, signatures) for a user.
   * @param userId - User identifier
   * @returns User personal mail settings
   */
  async getSenderInfo(userId: number): Promise<UserPersonalSettings> {
    return this.httpGet<UserPersonalSettings>(
      `${this.options.urlPostSettings}/users/${userId}/settings/sender_info`,
    );
  }

  /**
   * Updates the sender info settings for a user.
   * @param userId - User identifier
   * @param settings - New sender info settings
   * @returns Updated settings
   */
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

  /**
   * Returns whether automatic address collection is enabled for a user.
   * @param userId - User identifier
   * @returns Object with `collectAddresses` boolean flag
   */
  async getCollectAddresses(userId: number): Promise<CollectAddressStatus> {
    return this.httpGet<CollectAddressStatus>(
      `${this.options.urlPostSettings}/users/${userId}/settings/address_book`,
    );
  }

  /**
   * Enables or disables automatic address collection for a user.
   * @param userId - User identifier
   * @param status - Object with `collectAddresses` boolean flag
   * @returns Updated status
   */
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

  /**
   * Returns the list of mail rules (autoreplies and forwards) for a user.
   * @param userId - User identifier
   * @returns Lists of autoreply and forward rules
   */
  async getUserRules(userId: number): Promise<UserRulesList> {
    return this.httpGet<UserRulesList>(
      `${this.options.urlPostSettings}/users/${userId}/settings/user_rules`,
    );
  }

  /**
   * Creates a new mail rule (autoreply or forward) for a user.
   * @param userId - User identifier
   * @param rule - Rule to create (autoreply or forward)
   * @returns ID of the created rule
   */
  async addUserRule(userId: number, rule: UserRule): Promise<number> {
    if (!rule) throw new Error("rule is required");
    const result = await this.httpPost<UserRuleAddResponse>(
      `${this.options.urlPostSettings}/users/${userId}/settings/user_rules`,
      rule,
    );
    return result.ruleId;
  }

  /**
   * Deletes a mail rule for a user.
   * @param userId - User identifier
   * @param ruleId - Rule identifier
   */
  async deleteUserRule(userId: number, ruleId: number): Promise<void> {
    await this.httpDelete(
      `${this.options.urlPostSettings}/users/${userId}/settings/user_rules/${ruleId}`,
    );
  }
}

import { BaseClient } from "../base-client.js";
import { ValidationError } from "../errors.js";
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
   * @throws {APIRequestError} On HTTP error response
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
   * @throws {ValidationError} If `settings` is null or undefined
   * @throws {APIRequestError} On HTTP error response
   */
  async setSenderInfo(
    userId: number,
    settings: UserPersonalSettings,
  ): Promise<UserPersonalSettings> {
    if (!settings) throw new ValidationError("settings is required");
    return this.httpPost<UserPersonalSettings>(
      `${this.options.urlPostSettings}/users/${userId}/settings/sender_info`,
      settings,
    );
  }

  /**
   * Returns whether automatic address collection is enabled for a user.
   * @param userId - User identifier
   * @returns Object with `collectAddresses` boolean flag
   * @throws {APIRequestError} On HTTP error response
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
   * @throws {ValidationError} If `status` is null or undefined
   * @throws {APIRequestError} On HTTP error response
   */
  async setCollectAddresses(
    userId: number,
    status: CollectAddressStatus,
  ): Promise<CollectAddressStatus> {
    if (!status) throw new ValidationError("status is required");
    return this.httpPost<CollectAddressStatus>(
      `${this.options.urlPostSettings}/users/${userId}/settings/address_book`,
      status,
    );
  }

  /**
   * Returns the list of mail rules (autoreplies and forwards) for a user.
   * @param userId - User identifier
   * @returns Lists of autoreply and forward rules
   * @throws {APIRequestError} On HTTP error response
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
   * @throws {ValidationError} If `rule` is null or undefined
   * @throws {APIRequestError} On HTTP error response
   */
  async addUserRule(userId: number, rule: UserRule): Promise<number> {
    if (!rule) throw new ValidationError("rule is required");
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
   * @throws {APIRequestError} On HTTP error response
   */
  async deleteUserRule(userId: number, ruleId: number): Promise<void> {
    await this.httpDelete(
      `${this.options.urlPostSettings}/users/${userId}/settings/user_rules/${ruleId}`,
    );
  }
}

import { BaseClient } from "../base-client.js";
import type { Api360Options } from "../options.js";
import type {
  BaseContact,
  RemovedAlias,
  User,
  UserAdd,
  UserDomain2FA,
  UserEdit,
  UserStatus2FA,
  UsersList,
} from "../types/index.js";

export class UsersClient extends BaseClient {
  constructor(options: Api360Options) {
    super(options);
  }

  /**
   * Returns a paginated list of organization users.
   * @param page - Page number (1-based)
   * @param perPage - Items per page
   * @returns Paginated user list
   */
  async getList(page = 1, perPage = 10): Promise<UsersList> {
    return this.httpGet<UsersList>(`${this.options.urlUsers}?page=${page}&perPage=${perPage}`);
  }

  /**
   * Returns all users, fetching all pages automatically.
   * @returns Array of all users
   */
  async getAll(): Promise<User[]> {
    const result: User[] = [];
    let response = await this.getList(1, this.options.maxResponseCount);
    result.push(...response.users);
    for (let i = 2; i <= response.pages; i++) {
      response = await this.getList(i, this.options.maxResponseCount);
      result.push(...response.users);
    }
    return result;
  }

  /**
   * Returns a single user by ID.
   * @param userId - User identifier
   * @returns User object
   */
  async getById(userId: number): Promise<User> {
    return this.httpGet<User>(`${this.options.urlUsers}/${userId}`);
  }

  /**
   * Creates a new user in the organization.
   * @param user - User data to create
   * @returns Created user object
   * @throws {APIRequestError} On validation error or insufficient permissions
   */
  async add(user: UserAdd): Promise<User> {
    if (!user) throw new Error("user is required");
    return this.httpPost<User>(this.options.urlUsers, user);
  }

  /**
   * Updates user fields (only provided fields are changed).
   * @param user - User edit object; must include `id`
   * @returns Updated user object
   */
  async edit(user: UserEdit): Promise<User> {
    if (!user) throw new Error("user is required");
    const { id, ...patch } = user;
    const body = Object.fromEntries(
      Object.entries(patch).filter(([, v]) => v !== undefined && v !== null),
    );
    return this.httpPatch<User>(`${this.options.urlUsers}/${id}`, body);
  }

  /**
   * Updates a user from a full User object, optionally changing the password.
   * @param user - Full user object (read from API)
   * @param password - Optional new password
   * @returns Updated user object
   */
  async editFromUser(user: User, password?: string): Promise<User> {
    if (!user) throw new Error("user is required");
    const edit: UserEdit = {
      id: user.id,
      about: user.about,
      birthday: user.birthday,
      contacts: user.contacts?.map((c) => ({ label: c.label, type: c.type, value: c.value })),
      departmentId: user.departmentId,
      externalId: user.externalId,
      gender: user.gender,
      isAdmin: user.isAdmin,
      isEnabled: user.isEnabled,
      language: user.language,
      name: user.name,
      position: user.position,
      timezone: user.timezone,
      password,
    };
    return this.edit(edit);
  }

  /**
   * Adds an email alias to a user.
   * @param userId - User identifier
   * @param alias - Alias name (without domain)
   * @returns Updated user object
   */
  async addAlias(userId: number, alias: string): Promise<User> {
    if (!alias) throw new Error("alias is required");
    return this.httpPost<User>(`${this.options.urlUsers}/${userId}/aliases`, { alias });
  }

  /**
   * Removes an email alias from a user.
   * @param userId - User identifier
   * @param alias - Alias to remove
   * @returns `true` if removed
   */
  async deleteAlias(userId: number, alias: string): Promise<boolean> {
    if (!alias) throw new Error("alias is required");
    const result = await this.httpDelete<RemovedAlias>(
      `${this.options.urlUsers}/${userId}/aliases/${alias}`,
    );
    return result.removed;
  }

  /**
   * Replaces all manual contact entries for a user.
   * @param userId - User identifier
   * @param contacts - New contacts list (synthetic contacts cannot be changed)
   * @returns Updated user object
   */
  async updateContacts(userId: number, contacts: BaseContact[]): Promise<User> {
    return this.httpPut<User>(`${this.options.urlUsers}/${userId}/contacts`, { contacts });
  }

  /**
   * Deletes all manually added contacts for a user (synthetic contacts are preserved).
   * @param userId - User identifier
   * @returns Updated user object
   */
  async deleteContacts(userId: number): Promise<User> {
    return this.httpDelete<User>(`${this.options.urlUsers}/${userId}/contacts`);
  }

  /**
   * Returns whether a user has 2FA configured (v1 check).
   * @param userId - User identifier
   * @returns `true` if the user has 2FA set up
   */
  async getStatus2FA(userId: number): Promise<boolean> {
    const result = await this.httpGet<UserStatus2FA>(`${this.options.urlUsers}/${userId}/2fa`);
    return result.has2fa;
  }

  /**
   * Resets the security phone used for 2FA for a user.
   * @param userId - User identifier
   * @throws {APIRequestError} 400 if user has no security phone configured
   */
  async clear2FA(userId: number): Promise<void> {
    await this.httpDelete(`${this.options.urlUsers}/${userId}/2fa`);
  }

  /**
   * Returns the personal 2FA status for a user (v2 per-user mode only).
   * @param userId - User identifier
   * @returns Object with `id` and `is2faEnabled` flag
   */
  async getDomain2fa(userId: number): Promise<UserDomain2FA> {
    return this.httpGet<UserDomain2FA>(`${this.options.urlUsers}/${userId}/domain_2fa`);
  }

  /**
   * Enables or disables personal 2FA for a user (v2 per-user mode only).
   * @param userId - User identifier
   * @param is2faEnabled - `true` to enable, `false` to disable
   */
  async updateDomain2fa(userId: number, is2faEnabled: boolean): Promise<void> {
    await this.httpPatch<unknown>(
      `${this.options.urlUsers}/${userId}/domain_2fa?is2faEnabled=${is2faEnabled}`,
    );
  }

  /**
   * Uploads an avatar image for a user.
   * @param userId - User identifier
   * @param imageData - Image data as ArrayBuffer or Blob
   * @param filename - File name hint (default: `avatar.png`)
   */
  async setAvatar(
    userId: number,
    imageData: ArrayBuffer | Blob,
    filename = "avatar.png",
  ): Promise<void> {
    if (!imageData) throw new Error("imageData is required");
    const formData = new FormData();
    const blob =
      imageData instanceof Blob ? imageData : new Blob([imageData], { type: "image/png" });
    formData.append("file", blob, filename);
    await this.httpPutMultipart<unknown>(`${this.options.urlUsers}/${userId}/avatar`, formData);
  }
}

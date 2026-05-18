import { BaseClient } from "../base-client.js";
import type {
  Actor,
  ActorListAPIResponse,
  MailboxInfo,
  MailboxListAPIResponse,
  Resource,
  ResourceIdAPIResponse,
  ResourceListAPIResponse,
  ResourceShort,
  RoleType,
  TaskStatus,
  TaskStatusResponse,
} from "../types/index.js";
import { NotifyType } from "../types/index.js";

interface TaskIdAPIResponse {
  taskId: string;
}

export class MailboxesClient extends BaseClient {
  /**
   * Returns a paginated list of delegated mailboxes.
   * @param page - Page number (1-based)
   * @param perPage - Items per page
   * @returns Array of delegated mailbox resource stubs
   */
  async getDelegatedList(page = 1, perPage = 10): Promise<ResourceShort[]> {
    const result = await this.httpGet<MailboxListAPIResponse>(
      `${this.options.urlMailboxManagement}/delegated?page=${page}&perPage=${perPage}`,
    );
    return result.resources;
  }

  /**
   * Returns all delegated mailboxes, fetching all pages automatically.
   * @returns Array of all delegated mailbox resource stubs
   */
  async getAllDelegated(): Promise<ResourceShort[]> {
    const initial = await this.httpGet<MailboxListAPIResponse>(
      `${this.options.urlMailboxManagement}/delegated`,
    );
    const full = await this.httpGet<MailboxListAPIResponse>(
      `${this.options.urlMailboxManagement}/delegated?page=1&perPage=${initial.total}`,
    );
    if (full.perPage >= full.total) return full.resources;

    const result: ResourceShort[] = [...full.resources];
    const pages = Math.ceil(full.total / full.perPage);
    for (let i = 2; i <= pages; i++) {
      result.push(...(await this.getDelegatedList(i, full.perPage)));
    }
    return result;
  }

  /**
   * Returns a paginated list of shared mailboxes.
   * @param page - Page number (1-based)
   * @param perPage - Items per page
   * @returns Array of shared mailbox resource stubs
   */
  async getList(page = 1, perPage = 10): Promise<ResourceShort[]> {
    const result = await this.httpGet<MailboxListAPIResponse>(
      `${this.options.urlMailboxManagement}/shared?page=${page}&perPage=${perPage}`,
    );
    return result.resources;
  }

  /**
   * Creates a new shared mailbox.
   * @param email - Email address for the shared mailbox
   * @param name - Display name
   * @param description - Description
   * @returns ID of the created shared mailbox
   * @throws {APIRequestError} On validation error or insufficient permissions
   */
  async add(email: string, name: string, description: string): Promise<string> {
    if (!email) throw new Error("email is required");
    if (!name) throw new Error("name is required");
    if (!description) throw new Error("description is required");
    const result = await this.httpPut<ResourceIdAPIResponse>(
      `${this.options.urlMailboxManagement}/shared`,
      { email, name, description },
    );
    return result.resourceId;
  }

  /**
   * Returns information about a shared mailbox.
   * @param id - Shared mailbox identifier (string uint64)
   * @returns Mailbox info object
   */
  async getInfo(id: string): Promise<MailboxInfo> {
    if (!id) throw new Error("id is required");
    return this.httpGet<MailboxInfo>(`${this.options.urlMailboxManagement}/shared/${id}`);
  }

  /**
   * Updates the name and description of a shared mailbox.
   * @param id - Shared mailbox identifier (string uint64)
   * @param name - New display name
   * @param description - New description
   * @returns ID of the updated mailbox
   */
  async setInfo(id: string, name: string, description: string): Promise<string> {
    if (!id) throw new Error("id is required");
    const result = await this.httpPut<ResourceIdAPIResponse>(
      `${this.options.urlMailboxManagement}/shared/${id}`,
      { name, description },
    );
    return result.resourceId;
  }

  /**
   * Deletes a shared mailbox.
   * @param id - Shared mailbox identifier (string uint64)
   */
  async remove(id: string): Promise<void> {
    if (!id) throw new Error("id is required");
    await this.httpDelete(`${this.options.urlMailboxManagement}/shared/${id}`);
  }

  /**
   * Returns the list of employees with access to a mailbox.
   * @param id - Mailbox resource identifier (string uint64)
   * @returns Array of actors with their roles
   */
  async getActors(id: string): Promise<Actor[]> {
    if (!id) throw new Error("id is required");
    const result = await this.httpGet<ActorListAPIResponse>(
      `${this.options.urlMailboxManagement}/actors/${id}`,
    );
    return result.actors;
  }

  /**
   * Returns the list of mailboxes accessible to a user.
   * @param actorId - Actor (directory user) identifier
   * @returns Array of resources with their types and roles
   */
  async getMailboxesFromUser(actorId: string): Promise<Resource[]> {
    if (!actorId) throw new Error("actorId is required");
    const result = await this.httpGet<ResourceListAPIResponse>(
      `${this.options.urlMailboxManagement}/resources/${actorId}`,
    );
    return result.resources;
  }

  /**
   * Enables delegation for a mailbox (allows granting access to it).
   * @param id - Mailbox owner's resource identifier (string uint64)
   * @returns Resource ID of the delegated mailbox
   */
  async delegateAllow(id: string): Promise<string> {
    if (!id) throw new Error("id is required");
    const result = await this.httpPut<ResourceIdAPIResponse>(
      `${this.options.urlMailboxManagement}/delegated`,
      { resourceId: id },
    );
    return result.resourceId;
  }

  /**
   * Disables delegation for a mailbox.
   * @param id - Mailbox resource identifier (string uint64)
   */
  async delegateDeny(id: string): Promise<void> {
    if (!id) throw new Error("id is required");
    await this.httpDelete(`${this.options.urlMailboxManagement}/delegated/${id}`);
  }

  /**
   * Sets (grants or updates) access roles for an employee on a mailbox. The operation is async.
   * @param resourceId - Mailbox resource identifier (string uint64)
   * @param actorId - Employee identifier to grant access to (string uint64)
   * @param roles - Roles to assign
   * @param notify - Who to notify: `all`, `delegates`, or `none`
   * @returns Task ID for polling the operation status
   */
  async setRules(
    resourceId: string,
    actorId: string,
    roles: RoleType[],
    notify: NotifyType = NotifyType.All,
  ): Promise<string> {
    if (!resourceId) throw new Error("resourceId is required");
    if (!actorId) throw new Error("actorId is required");
    const url = new URL(`${this.options.urlMailboxManagement}/set/${resourceId}`);
    url.searchParams.set("actorId", actorId);
    if (notify !== NotifyType.All) url.searchParams.set("notify", notify);
    const result = await this.httpPost<TaskIdAPIResponse>(url.toString(), { roles: roles ?? [] });
    return result.taskId;
  }

  /**
   * Returns the status of an async mailbox access task.
   * @param taskId - Task identifier returned by `setRules`
   * @returns Current task status: `running`, `complete`, or `error`
   */
  async getTaskStatus(taskId: string): Promise<TaskStatus> {
    if (!taskId) throw new Error("taskId is required");
    const result = await this.httpGet<TaskStatusResponse>(
      `${this.options.urlMailboxManagement}/tasks/${taskId}`,
    );
    return result.status;
  }
}

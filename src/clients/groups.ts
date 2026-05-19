import { BaseClient } from "../base-client.js";
import { ValidationError } from "../errors.js";
import type {
  AddedMember,
  BaseGroup,
  DeletedMember,
  Group,
  GroupsList,
  Member,
  MembersList,
  MembersList2,
  RemovedElement,
} from "../types/index.js";
import { MemberTypes } from "../types/index.js";

export class GroupsClient extends BaseClient {
  /**
   * Returns paginated list of groups.
   * @param page - Page number (1-based)
   * @param perPage - Items per page
   * @returns Paginated group list
   * @throws {APIRequestError} On HTTP error response
   */
  async getList(page = 1, perPage = 10): Promise<GroupsList> {
    return this.httpGet<GroupsList>(`${this.options.urlGroups}?page=${page}&perPage=${perPage}`);
  }

  /**
   * Returns all groups, fetching all pages automatically.
   * @returns Array of all groups
   * @throws {APIRequestError} On HTTP error response
   */
  async getAll(): Promise<Group[]> {
    const result: Group[] = [];
    let response = await this.getList(1, this.options.maxResponseCount);
    result.push(...response.groups);
    for (let i = 2; i <= response.pages; i++) {
      response = await this.getList(i, this.options.maxResponseCount);
      result.push(...response.groups);
    }
    return result;
  }

  /**
   * Returns a single group by ID.
   * @param groupId - Group identifier
   * @returns Group object
   * @throws {APIRequestError} On HTTP error response
   */
  async getById(groupId: number): Promise<Group> {
    return this.httpGet<Group>(`${this.options.urlGroups}/${groupId}`);
  }

  /**
   * Creates a new group.
   * @param group - Group data to create
   * @returns Created group object
   * @throws {ValidationError} If `group` is null or undefined
   * @throws {APIRequestError} On HTTP error response
   */
  async add(group: BaseGroup): Promise<Group> {
    if (!group) throw new ValidationError("group is required");
    return this.httpPost<Group>(this.options.urlGroups, group);
  }

  /**
   * Updates group fields (only provided fields are changed).
   * @param group - Group with updated fields; must include `id`
   * @returns Updated group object
   * @throws {APIRequestError} On HTTP error response
   */
  async edit(group: Group): Promise<Group> {
    const { id, ...base } = group;
    return this.httpPatch<Group>(`${this.options.urlGroups}/${id}`, base);
  }

  /**
   * Deletes a group (members are not deleted).
   * @param groupId - Group identifier
   * @returns `true` if deleted
   * @throws {APIRequestError} On HTTP error response
   */
  async remove(groupId: number): Promise<boolean> {
    const result = await this.httpDelete<RemovedElement>(`${this.options.urlGroups}/${groupId}`);
    return result.removed;
  }

  /**
   * Returns the list of group members (v1: users, groups, departments).
   * @param groupId - Group identifier
   * @returns Members list
   * @throws {APIRequestError} On HTTP error response
   */
  async getMembers(groupId: number): Promise<MembersList> {
    return this.httpGet<MembersList>(`${this.options.urlGroups}/${groupId}/members`);
  }

  /**
   * Returns the list of group members (v2: includes external contacts and shared mailboxes).
   * @param groupId - Group identifier
   * @returns Extended members list
   * @throws {APIRequestError} On HTTP error response
   */
  async getMembers2(groupId: number): Promise<MembersList2> {
    return this.httpGet<MembersList2>(`${this.options.urlGroups2}/${groupId}/members`);
  }

  /**
   * Adds a single member to a group.
   * @param groupId - Group identifier
   * @param member - Member to add (type + id)
   * @returns `true` if added
   * @throws {ValidationError} If `member` is null or undefined
   * @throws {APIRequestError} On HTTP error response
   */
  async addMember(groupId: number, member: Member): Promise<boolean> {
    if (!member) throw new ValidationError("member is required");
    const result = await this.httpPost<AddedMember>(
      `${this.options.urlGroups}/${groupId}/members`,
      member,
    );
    return result.added;
  }

  /**
   * Removes a single member from a group.
   * @param groupId - Group identifier
   * @param member - Member to remove (type + id)
   * @returns `true` if deleted
   * @throws {APIRequestError} On HTTP error response
   */
  async removeMember(groupId: number, member: Member): Promise<boolean> {
    const result = await this.httpDelete<DeletedMember>(
      `${this.options.urlGroups}/${groupId}/members/${member.type}/${member.id}`,
    );
    return result.deleted;
  }

  /**
   * Removes all members from a group.
   * @param groupId - Group identifier
   * @returns Updated (empty) members list
   * @throws {APIRequestError} On HTTP error response
   */
  async removeAllMembers(groupId: number): Promise<MembersList> {
    return this.httpDelete<MembersList>(`${this.options.urlGroups}/${groupId}/members`);
  }

  /**
   * Removes all admins/managers from a group.
   * @param groupId - Group identifier
   * @returns Updated group object
   * @throws {APIRequestError} On HTTP error response
   */
  async removeAllManagers(groupId: number): Promise<Group> {
    return this.httpDelete<Group>(`${this.options.urlGroups}/${groupId}/admins`);
  }

  /**
   * Replaces the admin list for a group.
   * @param groupId - Group identifier
   * @param adminIds - Array of user IDs to set as admins
   * @returns Updated group object
   * @throws {APIRequestError} On HTTP error response
   */
  async editManagers(groupId: number, adminIds: number[]): Promise<Group> {
    return this.httpPut<Group>(`${this.options.urlGroups}/${groupId}/admins`, { adminIds });
  }

  /**
   * Replaces all members of a group.
   * @param groupId - Group identifier
   * @param members - New full member list
   * @returns Updated members list
   * @throws {APIRequestError} On HTTP error response
   */
  async editMembers(groupId: number, members: Member[]): Promise<MembersList> {
    return this.httpPut<MembersList>(`${this.options.urlGroups}/${groupId}/members`, { members });
  }

  /**
   * Adds multiple members to a group using the v2 API (supports external contacts and shared mailboxes).
   * @param groupId - Group identifier
   * @param opts - IDs to add by type (`userIds`, `externalContactIds`, `sharedMailboxIds` are string uint64)
   * @returns `true` if the request succeeded
   * @throws {APIRequestError} On HTTP error response
   */
  async addMembers(
    groupId: number,
    opts: {
      departmentIds?: number[];
      userIds?: string[];
      groupIds?: number[];
      externalContactIds?: string[];
      sharedMailboxIds?: string[];
    },
  ): Promise<boolean> {
    const body: Record<string, number[] | string[] | undefined> = {};
    if (opts.departmentIds?.length) body.departmentIds = opts.departmentIds;
    if (opts.userIds?.length) body.userIds = opts.userIds;
    if (opts.groupIds?.length) body.groupIds = opts.groupIds;
    if (opts.externalContactIds?.length) body.externalContactIds = opts.externalContactIds;
    if (opts.sharedMailboxIds?.length) body.sharedMailboxIds = opts.sharedMailboxIds;
    const result = await this.httpPatch<object>(
      `${this.options.urlGroups2}/${groupId}/members/add`,
      body,
    );
    return result != null;
  }

  /**
   * Convenience wrapper: adds a Member[] list using the v2 bulk-add API.
   * @param groupId - Group identifier
   * @param members - Members to add
   * @returns `true` if the request succeeded
   * @throws {APIRequestError} On HTTP error response
   */
  async addMembersList(groupId: number, members: Member[]): Promise<boolean> {
    const userIds = members.filter((m) => m.type === MemberTypes.user).map((m) => String(m.id));
    const departmentIds = members.filter((m) => m.type === MemberTypes.department).map((m) => m.id);
    const groupIds = members.filter((m) => m.type === MemberTypes.group).map((m) => m.id);
    return this.addMembers(groupId, {
      userIds: userIds.length ? userIds : undefined,
      departmentIds: departmentIds.length ? departmentIds : undefined,
      groupIds: groupIds.length ? groupIds : undefined,
    });
  }

  /**
   * Removes multiple members from a group using the v2 API (supports external contacts and shared mailboxes).
   * @param groupId - Group identifier
   * @param opts - IDs to remove by type (`userIds`, `externalContactIds`, `sharedMailboxIds` are string uint64)
   * @returns `true` if the request succeeded
   * @throws {APIRequestError} On HTTP error response
   */
  async removeMembers(
    groupId: number,
    opts: {
      departmentIds?: number[];
      userIds?: string[];
      groupIds?: number[];
      externalContactIds?: string[];
      sharedMailboxIds?: string[];
    },
  ): Promise<boolean> {
    const body: Record<string, number[] | string[] | undefined> = {};
    if (opts.departmentIds?.length) body.departmentIds = opts.departmentIds;
    if (opts.userIds?.length) body.userIds = opts.userIds;
    if (opts.groupIds?.length) body.groupIds = opts.groupIds;
    if (opts.externalContactIds?.length) body.externalContactIds = opts.externalContactIds;
    if (opts.sharedMailboxIds?.length) body.sharedMailboxIds = opts.sharedMailboxIds;
    const result = await this.httpPatch<object>(
      `${this.options.urlGroups2}/${groupId}/members/delete`,
      body,
    );
    return result != null;
  }
}

import type { DepartmentShort } from "./departments.js";
import type { MemberTypes } from "./enums.js";
import type { UserShort } from "./users.js";

/** A reference to a single group member (user, group, or department) */
export interface Member {
  /** Member type */
  type?: MemberTypes;
  /** Numeric identifier of the member entity */
  id: number;
}

/** Result of adding a single member */
export interface AddedMember extends Member {
  /** `true` if the member was successfully added */
  added: boolean;
}

/** Result of removing a single member */
export interface DeletedMember extends Member {
  /** `true` if the member was successfully removed */
  deleted: boolean;
}

/** Fields shared between create and read representations of a group */
export interface BaseGroup {
  /** Group display name */
  name: string;
  /** Human-readable description */
  description?: string;
  /** Email alias label (part before `@`) */
  label?: string;
  /** Arbitrary external identifier for integration purposes */
  externalId?: string;
  /** Initial members of the group */
  members?: Member[];
  /** User IDs of the group administrators */
  adminIds?: number[];
}

/** Full group object as returned by the API */
export interface Group extends BaseGroup {
  /** Unique numeric group identifier */
  id: number;
  /** Group type (e.g. `generic`) */
  type?: string;
  /** Total number of members */
  membersCount: number;
  /** Primary email address of the group */
  email: string;
  /** Internal email object identifier (string uint64) */
  emailId?: string;
  /** Email aliases of the group */
  aliases: string[];
  /** `true` if the group has been deleted */
  removed: boolean;
  /** User ID of the group creator */
  authorId: number;
  /** IDs of parent groups this group belongs to */
  memberOf?: number[];
  /** ISO 8601 timestamp of creation */
  createdAt: string;
}

/** Compact group object used inside other member lists */
export interface GroupShort {
  id: number;
  membersCount: number;
  name: string;
}

/** Paginated list of groups */
export interface GroupsList {
  groups: Group[];
  /** Current page number (1-based) */
  page: number;
  /** Total number of pages */
  pages: number;
  /** Items per page */
  perPage: number;
  /** Total number of groups */
  total: number;
}

/** Group members list (v1 — users, groups, departments) */
export interface MembersList {
  departments: DepartmentShort[];
  groups: GroupShort[];
  users: UserShort[];
}

/** Compact external contact used inside v2 member lists */
export interface ExternalContactShort {
  id: number;
  firstName: string;
  lastName: string;
  middleName?: string;
}

/** Compact shared mailbox used inside v2 member lists */
export interface SharedMailboxShort {
  id: number;
  name: string;
}

/** Group members list (v2 — includes external contacts and shared mailboxes) */
export interface MembersList2 {
  departments: DepartmentShort[];
  groups: GroupShort[];
  users: UserShort[];
  externalContacts: ExternalContactShort[];
  sharedMailboxes?: SharedMailboxShort[];
}

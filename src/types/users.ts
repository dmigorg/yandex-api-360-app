import type { ContactTypes } from "./enums.js";

/** Person's full name */
export interface Name {
  /** Given name */
  first: string;
  /** Family name */
  last: string;
  /** Patronymic / middle name */
  middle?: string;
}

/** Minimal contact entry used when creating or editing a user */
export interface BaseContact {
  /** Contact type */
  type?: ContactTypes;
  /** Contact value (phone number, email, URL, etc.) */
  value: string;
  /** Human-readable label */
  label?: string;
}

/** Full contact entry as returned by the API */
export interface Contact extends BaseContact {
  /** This is the primary contact of its type */
  main: boolean;
  /** Contact belongs to an email alias (not the primary address) */
  alias: boolean;
  /** Contact was created automatically by the system */
  synthetic: boolean;
}

/** Full user object as returned by the API */
export interface User {
  /** Unique numeric user identifier */
  id: number;
  /** Login (username without domain) */
  nickname: string;
  /** ID of the department the user belongs to */
  departmentId: number;
  /** Primary email address */
  email: string;
  /** Full name */
  name: Name;
  /** Gender (`male` or `female`) */
  gender?: string;
  /** Job title */
  position?: string;
  /** Avatar image identifier */
  avatarId?: string;
  /** Short bio / about text */
  about?: string;
  /** Date of birth (`YYYY-MM-DD`) */
  birthday?: string;
  /** All contacts of the user */
  contacts: Contact[];
  /** Email aliases */
  aliases: string[];
  /** IDs of groups the user belongs to */
  groups?: number[];
  /** Arbitrary external identifier for integration purposes */
  externalId?: string;
  /** User has organisation-level admin rights */
  isAdmin: boolean;
  /** User is a robot / service account */
  isRobot: boolean;
  /** User has been dismissed (deactivated) */
  isDismissed: boolean;
  /** User account is currently active */
  isEnabled: boolean;
  /** ISO 8601 timestamp of the last `isEnabled` change */
  isEnabledUpdatedAt?: string;
  /** IANA timezone name (e.g. `Europe/Moscow`) */
  timezone?: string;
  /** Preferred interface language */
  language?: string;
  /** ISO 8601 timestamp of account creation */
  createdAt: string;
  /** ISO 8601 timestamp of the last update */
  updatedAt: string;
  /** Display name shown in the UI instead of `name` */
  displayName?: string;
}

/** Compact user object used inside group/department member lists */
export interface UserShort {
  id: number;
  name: Name;
  avatarId?: string;
  departmentId: number;
  email: string;
  gender?: string;
  nickname: string;
  position?: string;
}

/** Payload for creating a new user */
export interface UserAdd {
  /** Login (username without domain) */
  nickname: string;
  /** Department the user will belong to */
  departmentId: number;
  /** Full name */
  name: Name;
  /** Initial password */
  password: string;
  about?: string;
  birthday?: string;
  gender?: string;
  position?: string;
  contacts?: BaseContact[];
  externalId?: string;
  /** Grant organisation-level admin rights */
  isAdmin?: boolean;
  timezone?: string;
  language?: string;
  displayName?: string;
  /** Require the user to change their password on first login */
  passwordChangeRequired?: boolean;
}

/** Payload for updating an existing user (only provided fields are changed) */
export interface UserEdit {
  /** Identifier of the user to update */
  id: number;
  about?: string;
  birthday?: string;
  departmentId?: number;
  name?: Name;
  gender?: string;
  position?: string;
  contacts?: BaseContact[];
  externalId?: string;
  isAdmin?: boolean;
  /** Enable or disable the user account */
  isEnabled?: boolean;
  timezone?: string;
  language?: string;
  /** Set a new password */
  password?: string;
  displayName?: string;
  /** Require the user to change their password on next login */
  passwordChangeRequired?: boolean;
}

/** Paginated list of users */
export interface UsersList {
  users: User[];
  /** Current page number (1-based) */
  page: number;
  /** Total number of pages */
  pages: number;
  /** Items per page */
  perPage: number;
  /** Total number of users */
  total: number;
}

/** 2FA status for a specific user (v1) */
export interface UserStatus2FA {
  /** User has 2FA configured */
  has2fa: boolean;
  /** User has a security phone configured (required before calling `clear2FA`) */
  hasSecurityPhone: boolean;
  /** User identifier (string uint64) */
  userId: string;
}

/** Per-user 2FA state (v2 per-user mode) */
export interface UserDomain2FA {
  /** User identifier */
  id: string;
  /** Personal 2FA is currently enabled for this user */
  is2faEnabled: boolean;
}

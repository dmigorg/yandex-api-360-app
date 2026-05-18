import type { ResourceType, RoleType, TaskStatus } from "./enums.js";

/** Compact mailbox resource stub returned in list responses */
export interface ResourceShort {
  /** Number of actors (delegates) with access */
  count: number;
  /** Mailbox resource identifier (string uint64) */
  resourceId: string;
}

/** A mailbox resource with access role information */
export interface Resource {
  /** Mailbox resource identifier (string uint64) */
  resourceId: string;
  /** Mailbox type */
  type: ResourceType;
  /** Roles assigned to the current actor */
  roles: RoleType[];
}

/** Detailed information about a shared mailbox */
export interface MailboxInfo {
  /** Shared mailbox identifier (string uint64) */
  id: string;
  /** Email address of the shared mailbox */
  email: string;
  /** Display name */
  name: string;
  /** Description */
  description: string;
  /** ISO 8601 timestamp of creation */
  createdAt: string;
  /** ISO 8601 timestamp of the last update */
  updatedAt: string;
}

/** An employee with access to a mailbox */
export interface Actor {
  /** Employee (directory user) identifier (string uint64) */
  actorId: string;
  /** Roles assigned to this actor */
  roles: RoleType[];
}

/** Response containing the ID of a newly created or updated resource */
export interface ResourceIdAPIResponse {
  /** Mailbox resource identifier (string uint64) */
  resourceId: string;
}

/** Response containing a task identifier for async operations */
export interface TaskIdResponse {
  taskId: string;
}

/** Response containing the current status of an async task */
export interface TaskStatusResponse {
  status: TaskStatus;
}

// ─── Internal API response wrappers ──────────────────────────────────────────

/** @internal Paginated list of mailbox resource stubs */
export interface MailboxListAPIResponse {
  resources: ResourceShort[];
  page: number;
  perPage: number;
  total: number;
}

/** @internal List of actors returned by the API */
export interface ActorListAPIResponse {
  actors: Actor[];
}

/** @internal List of resources returned by the API */
export interface ResourceListAPIResponse {
  resources: Resource[];
}

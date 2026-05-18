import type { EventType, MailEventType } from "./enums.js";

/** A single Disk audit log event */
export interface Event {
  /** ISO 8601 timestamp of the event */
  date: string;
  /** Event type */
  eventType: EventType;
  /** ISO 8601 timestamp of the last modification of this log entry */
  lastModificationDate: string;
  /** Organisation identifier */
  orgId: number;
  /** Login of the resource owner */
  ownerLogin?: string;
  /** Display name of the resource owner */
  ownerName?: string;
  /** UID of the resource owner */
  ownerUid?: number;
  /** Path to the affected file or directory */
  path: string;
  /** Unique request identifier */
  requestId: string;
  /** File identifier of the affected resource */
  resourceFileId?: string;
  /** Access rights mask */
  rights?: string;
  /** File size in bytes */
  size: number;
  /** Unique event identifier */
  uniqId: string;
  /** Login of the user who performed the action */
  userLogin: string;
  /** Display name of the user who performed the action */
  userName: string;
  /** UID of the user who performed the action */
  userUid: number;
  /** Client IP address */
  clientIp?: string;
}

/** Paginated Disk audit log (cursor-based) */
export interface EventList {
  events: Event[];
  /** Cursor token for the next page; absent on the last page */
  nextPageToken?: string;
}

/** A single Mail audit log event */
export interface MailEvent {
  /** Event type */
  eventType: MailEventType;
  /** UID of the user who triggered the event */
  uid: string;
  /** ISO 8601 timestamp of the event */
  timestamp: string;
}

/** Paginated Mail audit log (cursor-based) */
export interface MailEventList {
  events: MailEvent[];
  /** Cursor token for the next page; absent on the last page */
  nextPageToken?: string;
}

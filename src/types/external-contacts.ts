/** An email address belonging to an external contact */
export interface ExternalContactEmail {
  /** Email address */
  email: string;
  /** This is the primary address (`true`) or a secondary one (`false`) */
  main: boolean;
  /** Address type: `work` for work email; empty string for personal */
  type?: string;
}

/** A phone number belonging to an external contact */
export interface ExternalContactPhone {
  /** Phone number */
  phone: string;
  /** This is the primary phone number (at most one per contact) */
  main?: boolean;
  /** Phone type: `work`, `mobile`, `ip`, or empty string for other */
  type?: string;
}

/** Payload for creating a new external contact */
export interface ExternalContactCreate {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  /** Job title */
  title?: string;
  company?: string;
  /** Department within the company */
  department?: string;
  /** Postal address */
  address?: string;
  /** Arbitrary external identifier for integration purposes */
  externalId?: string;
  /** Email addresses — at least one is required */
  emails: ExternalContactEmail[];
  phones?: ExternalContactPhone[];
}

/** Payload for updating an external contact's descriptive fields */
export interface ExternalContactUpdate {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  title?: string;
  company?: string;
  department?: string;
  address?: string;
}

/** Full external contact object as returned by the API */
export interface ExternalContact {
  /** Unique identifier (string) */
  id: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  title?: string;
  company?: string;
  department?: string;
  address?: string;
  externalId?: string;
  emails: ExternalContactEmail[];
  phones?: ExternalContactPhone[];
  /** ISO 8601 timestamp of creation */
  createdAt: string;
  /** ISO 8601 timestamp of the last update */
  updatedAt: string;
}

/** Paginated list of external contacts */
export interface ExternalContactList {
  contacts: ExternalContact[];
  /** Current page number (1-based) */
  page: number;
  /** Total number of pages */
  pages: number;
  /** Items per page */
  perPage: number;
  /** Total number of contacts */
  total: number;
}

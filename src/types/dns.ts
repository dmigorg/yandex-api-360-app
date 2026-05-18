import type { DNSRecordTypes } from "./enums.js";

/** A DNS record of the organisation's domain */
export interface DNSRecord {
  /** IPv4/IPv6 address (A / AAAA records) */
  address?: string;
  /** Mail server hostname (MX records) */
  exchange?: string;
  /** CAA flag value */
  flag?: number;
  /** Record name (subdomain or `@` for root) */
  name: string;
  /** Service port (SRV records) */
  port?: number;
  /** MX preference value (lower = higher priority) */
  preference?: number;
  /** SRV priority */
  priority?: number;
  /** Unique record identifier (assigned by the API on creation) */
  recordId?: number;
  /** CAA tag (`issue`, `issuewild`, `iodef`) */
  tag?: string;
  /** SRV / CNAME target hostname */
  target?: string;
  /** TXT record value */
  text?: string;
  /** Time-to-live in seconds */
  ttl: number;
  /** DNS record type */
  type: DNSRecordTypes;
  /** Generic value field */
  value?: string;
  /** SRV weight */
  weight?: number;
}

/** Paginated list of DNS records */
export interface DNSList {
  records: DNSRecord[];
  /** Current page number (1-based) */
  page: number;
  /** Total number of pages */
  pages: number;
  /** Items per page */
  perPage: number;
  /** Total number of records */
  total: number;
}

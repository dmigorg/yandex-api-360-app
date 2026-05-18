/** Verification result for a single DNS record type */
export interface DomainStatusValue {
  /** The DNS record value found during the last check */
  value: string;
  /** `true` if the record matches the expected value */
  match: boolean;
}

/** Last DNS verification status for a domain */
export interface DomainStatus {
  /** Domain name */
  name: string;
  /** DKIM record verification result */
  dkim: DomainStatusValue;
  /** SPF record verification result */
  spf: DomainStatusValue;
  /** MX record verification result */
  mx: DomainStatusValue;
  /** NS record verification result */
  ns: DomainStatusValue;
  /** ISO 8601 timestamp of the last DNS check */
  lastCheck: string;
  /** ISO 8601 timestamp when the domain was last added */
  lastAdded: string;
}

/** A domain connected to the organisation */
export interface Domain {
  /** Full domain name (e.g. `example.com`) */
  name: string;
  /** Country code associated with the domain */
  country?: string;
  /** MX records are configured correctly */
  mx: boolean;
  /** DNS management is delegated to Yandex */
  delegated: boolean;
  /** This is the organisation's master (primary) domain */
  master: boolean;
  /** Domain ownership has been verified */
  verified: boolean;
  /** Latest DNS verification details */
  status: DomainStatus;
}

/** Paginated list of domains */
export interface DomainList {
  domains: Domain[];
  /** Current page number (1-based) */
  page: number;
  /** Total number of pages */
  pages: number;
  /** Items per page */
  perPage: number;
  /** Total number of domains */
  total: number;
}

/** A single domain ownership confirmation method */
export interface ConfirmationMethod {
  /** Verification code to place in DNS */
  code: string;
  /** Verification method type (e.g. `TXT`, `CNAME`) */
  method: string;
}

/** Domain connection and ownership verification status */
export interface DomainConnectStatus {
  /** Current connection status */
  status: string;
  /** Available ownership confirmation methods */
  methods: ConfirmationMethod[];
}

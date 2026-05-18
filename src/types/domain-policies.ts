/** A list filter used in domain policy conditions */
export interface PolicyFilter {
  /** List of IPs, CIDR subnets, domains, or email addresses to match against */
  list: string[];
}

/**
 * Condition for a domain policy rule.
 * Only one filter type should be set per rule.
 */
export interface PolicyCondition {
  /** Filter by sender IPv4/IPv6 address or subnet */
  ip_filter?: PolicyFilter | null;
  /** Filter by sender domain (supports `*` wildcard) */
  domain_filter?: PolicyFilter | null;
  /** Filter by exact sender email address */
  email_from_filter?: PolicyFilter | null;
}

/** Extra options for an `accept` action */
export interface PolicyActionOptions {
  /** Force-classify the message as `spam` or `ham` */
  force?: string;
}

/** Action applied to messages matching a domain policy rule */
export interface PolicyAction {
  /** Action type: `accept` — deliver the message; `reject` — discard it */
  type: string;
  /** Additional options (only applicable for `accept`) */
  options?: PolicyActionOptions;
}

/** A single domain mail policy rule */
export interface DomainPolicy {
  /** Human-readable rule name */
  name: string;
  /** Human-readable rule description */
  description?: string;
  /** Rule is currently active */
  enabled: boolean;
  /** Condition that triggers this rule */
  condition: PolicyCondition;
  /** Action to apply when the condition matches */
  action: PolicyAction;
}

/** Full domain policies response including revision tracking */
export interface PoliciesList {
  rules: DomainPolicy[];
  /** Monotonically increasing revision number; changes on every update */
  revision?: number;
}

/** Domain-level 2FA status (v1) */
export interface DomainStatus2FA {
  /** 2FA enforcement duration in hours (how long users have to set up 2FA) */
  duration: number;
  /** 2FA is currently enforced for the entire domain */
  enabled: boolean;
  /** ISO 8601 timestamp when 2FA was last enabled */
  enabledAt?: string;
}

/** Payload for enabling domain-level 2FA (v1) */
export interface EnableDomainStatus2FA {
  /** Enforcement duration in hours */
  duration: number;
  /** Immediately log out all users when enabling 2FA */
  logoutUsers: boolean;
  /** Allowed verification method: `default` or `phone` */
  validationMethod?: string;
}

/** Domain-level 2FA status (v2 — supports per-user mode) */
export interface DomainStatus2FAV2 {
  /** Enforcement duration in hours */
  duration: number;
  /** 2FA is currently enforced */
  enabled: boolean;
  /** ISO 8601 timestamp when 2FA was last enabled */
  enabledAt?: string;
  /** Enforcement scope: `per_domain` or `per_user` */
  scope: string;
}

/** Payload for enabling domain-level 2FA (v2) */
export interface EnableDomainStatus2FAV2 {
  /** Enforcement duration in hours */
  duration: number;
  /** Immediately log out all users when enabling 2FA */
  logoutUsers: boolean;
  /** Enforcement scope: `per_domain` or `per_user` */
  scope?: string;
  /** Allowed verification method */
  validationMethod?: string;
}

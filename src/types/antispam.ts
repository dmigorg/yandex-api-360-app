/** IP allowlist for the organisation's antispam settings */
export interface WhiteList {
  /** List of allowed IPv4/IPv6 addresses and CIDR subnets (e.g. `"77.88.21.249"`, `"2a02:6b8::/32"`) */
  allowList: string[];
}

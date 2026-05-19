import { ValidationError } from "./errors.js";

export interface Api360OptionsParams {
  organizationId: string;
  token: string;
  baseUrl?: string;
  maxResponseCount?: number;
}

export class Api360Options {
  readonly token: string;
  readonly maxResponseCount: number;
  readonly maxCountOrgInResponse = 100;

  private readonly organizationId: string;
  private readonly baseUrl: string;

  /**
   * @param params - Client configuration
   * @throws {ValidationError} If `organizationId` or `token` is empty
   */
  constructor(params: Api360OptionsParams) {
    if (!params.organizationId) throw new ValidationError("organizationId is required");
    if (!params.token) throw new ValidationError("token is required");
    this.organizationId = params.organizationId;
    this.token = params.token;
    this.baseUrl = params.baseUrl ?? "https://api360.yandex.net";
    this.maxResponseCount = params.maxResponseCount ?? 1000;
  }

  get urlAntispam() {
    return `${this.baseUrl}/admin/v1/org/${this.organizationId}/mail/antispam/allowlist/ips`;
  }

  get urlUsers() {
    return `${this.baseUrl}/directory/v1/org/${this.organizationId}/users`;
  }

  get urlPostSettings() {
    return `${this.baseUrl}/admin/v1/org/${this.organizationId}/mail`;
  }

  get urlDepartments() {
    return `${this.baseUrl}/directory/v1/org/${this.organizationId}/departments`;
  }

  get urlGroups() {
    return `${this.baseUrl}/directory/v1/org/${this.organizationId}/groups`;
  }

  get urlGroups2() {
    return `${this.baseUrl}/directory/v2/org/${this.organizationId}/groups`;
  }

  get url2fa() {
    return `${this.baseUrl}/security/v1/org/${this.organizationId}/domain_2fa`;
  }

  get url2faV2() {
    return `${this.baseUrl}/security/v2/org/${this.organizationId}/domain_2fa`;
  }

  get urlOrg() {
    return `${this.baseUrl}/directory/v1/org`;
  }

  get urlRouting() {
    return `${this.baseUrl}/admin/v1/org/${this.organizationId}/mail/routing/rules`;
  }

  get urlDomains() {
    return `${this.baseUrl}/directory/v1/org/${this.organizationId}/domains`;
  }

  get urlPasswords() {
    return `${this.baseUrl}/security/v1/org/${this.organizationId}/domain_passwords`;
  }

  get urlSecurity() {
    return `${this.baseUrl}/security/v1/org/${this.organizationId}`;
  }

  get urlMailboxManagement() {
    return `${this.baseUrl}/admin/v1/org/${this.organizationId}/mailboxes`;
  }

  get urlExternalContacts() {
    return `${this.baseUrl}/directory/v1/org/${this.organizationId}/external_contacts`;
  }

  get urlOauthRestrictions() {
    return `${this.baseUrl}/security/v1/org/${this.organizationId}/oauth_access_restriction`;
  }

  get urlServiceApplications() {
    return `${this.baseUrl}/security/v1/org/${this.organizationId}/service_applications`;
  }

  get urlDomainPolicies() {
    return `${this.baseUrl}/admin/v1/org/${this.organizationId}/mail/routing/policies`;
  }
}

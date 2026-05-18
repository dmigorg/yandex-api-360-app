import { BaseClient } from "./base-client.js";
import { AntispamClient } from "./clients/antispam.js";
import { AuditClient } from "./clients/audit.js";
import { AuthSettingsClient } from "./clients/auth-settings.js";
import { DepartmentsClient } from "./clients/departments.js";
import { DNSClient } from "./clients/dns.js";
import { DomainPoliciesClient } from "./clients/domain-policies.js";
import { DomainsClient } from "./clients/domains.js";
import { ExternalContactsClient } from "./clients/external-contacts.js";
import { GroupsClient } from "./clients/groups.js";
import { MailboxesClient } from "./clients/mailboxes.js";
import { OauthRestrictionsClient } from "./clients/oauth-restrictions.js";
import { OrganizationsClient } from "./clients/organizations.js";
import { PasswordManagementClient } from "./clients/password-management.js";
import { PostSettingsClient } from "./clients/post-settings.js";
import { RoutingClient } from "./clients/routing.js";
import { ServiceApplicationsClient } from "./clients/service-applications.js";
import { TwoFAClient } from "./clients/two-fa.js";
import { UsersClient } from "./clients/users.js";
import { Api360Options, type Api360OptionsParams } from "./options.js";

export class Client extends BaseClient {
  readonly mailboxes: MailboxesClient;
  readonly twoFA: TwoFAClient;
  readonly antispam: AntispamClient;
  readonly audit: AuditClient;
  readonly authSettings: AuthSettingsClient;
  readonly departments: DepartmentsClient;
  readonly dns: DNSClient;
  readonly domainPolicies: DomainPoliciesClient;
  readonly domains: DomainsClient;
  readonly externalContacts: ExternalContactsClient;
  readonly groups: GroupsClient;
  readonly oauthRestrictions: OauthRestrictionsClient;
  readonly organization: OrganizationsClient;
  readonly passwordManagement: PasswordManagementClient;
  readonly postSettings: PostSettingsClient;
  readonly routing: RoutingClient;
  readonly serviceApplications: ServiceApplicationsClient;
  readonly users: UsersClient;

  constructor(params: Api360OptionsParams | Api360Options) {
    const options = params instanceof Api360Options ? params : new Api360Options(params);
    super(options);
    this.mailboxes = new MailboxesClient(options);
    this.twoFA = new TwoFAClient(options);
    this.antispam = new AntispamClient(options);
    this.audit = new AuditClient(options);
    this.authSettings = new AuthSettingsClient(options);
    this.departments = new DepartmentsClient(options);
    this.dns = new DNSClient(options);
    this.domainPolicies = new DomainPoliciesClient(options);
    this.domains = new DomainsClient(options);
    this.externalContacts = new ExternalContactsClient(options);
    this.groups = new GroupsClient(options);
    this.oauthRestrictions = new OauthRestrictionsClient(options);
    this.organization = new OrganizationsClient(options);
    this.passwordManagement = new PasswordManagementClient(options);
    this.postSettings = new PostSettingsClient(options);
    this.routing = new RoutingClient(options);
    this.serviceApplications = new ServiceApplicationsClient(options);
    this.users = new UsersClient(options);
  }
}

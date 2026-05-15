import type {
  ActionTypes,
  ContactTypes,
  DirectionTypes,
  DNSRecordTypes,
  EventType,
  Languages,
  MemberTypes,
  NotifyType,
  ResourceType,
  RoleType,
  SignPositions,
  TaskStatus,
} from "./enums.js";

// ─── Base / shared ────────────────────────────────────────────────────────────

export interface Name {
  first: string;
  last: string;
  middle?: string;
}

export interface BaseContact {
  type?: ContactTypes;
  value: string;
  label?: string;
}

export interface Contact extends BaseContact {
  main: boolean;
  alias: boolean;
  synthetic: boolean;
}

// ─── Users ────────────────────────────────────────────────────────────────────

export interface User {
  id: number;
  nickname: string;
  departmentId: number;
  email: string;
  name: Name;
  gender?: string;
  position?: string;
  avatarId?: string;
  about?: string;
  birthday?: string;
  contacts: Contact[];
  aliases: string[];
  groups?: number[];
  externalId?: string;
  isAdmin: boolean;
  isRobot: boolean;
  isDismissed: boolean;
  isEnabled: boolean;
  timezone?: string;
  language?: string;
  createdAt: string;
  updatedAt: string;
  displayName?: string;
}

export interface UserShort {
  id: number;
  name: Name;
  avatarId?: string;
  departmentId: number;
  email: string;
  gender?: string;
  nickname: string;
  position?: string;
}

export interface UserAdd {
  nickname: string;
  departmentId: number;
  name: Name;
  password: string;
  about?: string;
  birthday?: string;
  gender?: string;
  position?: string;
  contacts?: BaseContact[];
  externalId?: string;
  isAdmin?: boolean;
  timezone?: string;
  language?: string;
  displayName?: string;
}

export interface UserEdit {
  id: number;
  about?: string;
  birthday?: string;
  departmentId?: number;
  name?: Name;
  gender?: string;
  position?: string;
  contacts?: BaseContact[];
  externalId?: string;
  isAdmin?: boolean;
  isEnabled?: boolean;
  timezone?: string;
  language?: string;
  password?: string;
  displayName?: string;
}

export interface UsersList {
  users: User[];
  page: number;
  pages: number;
  perPage: number;
  total: number;
}

export interface UserStatus2FA {
  has2fa: boolean;
  userId: string;
}

// ─── Departments ──────────────────────────────────────────────────────────────

export interface BaseDepartment {
  description?: string;
  externalId?: string;
  headId?: number;
  label?: string;
  name: string;
  parentId: number;
}

export interface Department extends BaseDepartment {
  aliases: string[];
  createdAt: string;
  email: string;
  id: number;
  membersCount: number;
}

export interface DepartmentShort {
  id: number;
  membersCount: number;
  name: string;
}

export interface DepartmentsList {
  departments: Department[];
  page: number;
  pages: number;
  perPage: number;
  total: number;
}

// ─── Groups ───────────────────────────────────────────────────────────────────

export interface Member {
  type?: MemberTypes;
  id: number;
}

export interface AddedMember extends Member {
  added: boolean;
}

export interface DeletedMember extends Member {
  deleted: boolean;
}

export interface BaseGroup {
  name: string;
  description?: string;
  label?: string;
  externalId?: string;
  members?: Member[];
  adminIds?: number[];
}

export interface Group extends BaseGroup {
  id: number;
  type?: string;
  membersCount: number;
  email: string;
  aliases: string[];
  removed: boolean;
  authorId: number;
  memberOf?: number[];
  createdAt: string;
}

export interface GroupShort {
  id: number;
  membersCount: number;
  name: string;
}

export interface GroupsList {
  groups: Group[];
  page: number;
  pages: number;
  perPage: number;
  total: number;
}

export interface MembersList {
  departments: DepartmentShort[];
  groups: GroupShort[];
  users: UserShort[];
}

export interface ExternalContactShort {
  id: number;
  firstName: string;
  lastName: string;
  middleName?: string;
}

export interface SharedMailboxShort {
  id: number;
  name: string;
}

export interface MembersList2 {
  departments: DepartmentShort[];
  groups: GroupShort[];
  users: UserShort[];
  externalContacts: ExternalContactShort[];
  sharedMailboxes?: SharedMailboxShort[];
}

export interface UserDomain2FA {
  id: string;
  is2faEnabled: boolean;
}

export interface DomainStatus2FAV2 {
  duration: number;
  enabled: boolean;
  enabledAt?: string;
  scope: string;
}

export interface EnableDomainStatus2FAV2 {
  duration: number;
  logoutUsers: boolean;
  scope?: string;
  validationMethod?: string;
}

// ─── Organizations ────────────────────────────────────────────────────────────

export interface Organization {
  id: number;
  name: string;
  email: string;
  phone?: string;
  fax?: string;
  language?: string;
  subscriptionPlan?: string;
}

export interface OrganizationList {
  organizations: Organization[];
  nextPageToken?: string;
}

// ─── Domains ──────────────────────────────────────────────────────────────────

export interface DomainStatusValue {
  match: boolean;
  value: string;
}

export interface DomainStatus {
  dkim: DomainStatusValue;
  name: string;
  spf: DomainStatusValue;
  mx: DomainStatusValue;
  ns: DomainStatusValue;
  lastCheck: string;
  lastAdded: string;
}

export interface Domain {
  name: string;
  country?: string;
  mx: boolean;
  delegated: boolean;
  master: boolean;
  verified: boolean;
  status: DomainStatus;
}

export interface DomainList {
  domains: Domain[];
  page: number;
  pages: number;
  perPage: number;
  total: number;
}

export interface ConfirmationMethod {
  code: string;
  method: string;
}

export interface DomainConnectStatus {
  methods: ConfirmationMethod[];
  status: string;
}

// ─── DNS ──────────────────────────────────────────────────────────────────────

export interface DNSRecord {
  address?: string;
  exchange?: string;
  flag?: number;
  name: string;
  port?: number;
  preference?: number;
  priority?: number;
  recordId?: number;
  tag?: string;
  target?: string;
  text?: string;
  ttl: number;
  type: DNSRecordTypes;
  value?: string;
  weight?: number;
}

export interface DNSList {
  records: DNSRecord[];
  page: number;
  pages: number;
  perPage: number;
  total: number;
}

// ─── 2FA ──────────────────────────────────────────────────────────────────────

export interface DomainStatus2FA {
  duration: number;
  enabled: boolean;
  enabledAt?: string;
}

export interface EnableDomainStatus2FA {
  duration: number;
  logoutUsers: boolean;
}

// ─── Antispam ─────────────────────────────────────────────────────────────────

export interface WhiteList {
  allowList: string[];
}

// ─── Audit ────────────────────────────────────────────────────────────────────

export interface Event {
  date: string;
  eventType: EventType;
  lastModificationDate: string;
  orgId: number;
  ownerLogin?: string;
  ownerName?: string;
  ownerUid?: number;
  path: string;
  requestId: string;
  resourceFileId?: string;
  rights?: string;
  size: number;
  uniqId: string;
  userLogin: string;
  userName: string;
  userUid: number;
  clientIp?: string;
}

export interface EventList {
  events: Event[];
  nextPageToken?: string;
}

// ─── Auth settings ────────────────────────────────────────────────────────────

export interface CookiesSettings {
  authTTL: number;
}

// ─── Password management ──────────────────────────────────────────────────────

export interface PasswordParameters {
  enabled: boolean;
  changeFrequency?: number;
}

// ─── Post settings ────────────────────────────────────────────────────────────

export interface Sign {
  emails: string[];
  isDefault: boolean;
  text: string;
  lang: Languages;
}

export interface UserPersonalSettings {
  fromName?: string;
  defaultFrom?: string;
  signs?: Sign[];
  signPosition?: SignPositions;
}

export interface CollectAddressStatus {
  collectAddresses: boolean;
}

export interface AutoreplyRule {
  ruleId: number;
  ruleName: string;
  text: string;
}

export interface ForwardRule {
  ruleId: number;
  address: string;
  ruleName: string;
  withStore: boolean;
}

export interface UserRule {
  autoreply?: AutoreplyRule;
  forward?: ForwardRule;
}

export interface UserRulesList {
  autoreplies: AutoreplyRule[];
  forwards: ForwardRule[];
}

export interface UserRuleAddResponse {
  ruleId: number;
}

// ─── Routing ──────────────────────────────────────────────────────────────────

export interface ActionData {
  email: string;
}

export interface Action {
  action: ActionTypes;
  data?: ActionData;
}

export interface Scope {
  direction: DirectionTypes;
}

export interface Rule {
  actions: Action[];
  condition: unknown;
  scope: Scope;
  terminal: boolean;
}

export interface RulesList {
  rules: Rule[];
}

// ─── Mailboxes ────────────────────────────────────────────────────────────────

export interface ResourceShort {
  count: number;
  resourceId: number;
}

export interface Resource {
  resourceId: number;
  type: ResourceType;
  roles: RoleType[];
}

export interface MailboxInfo {
  id: number;
  email: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Actor {
  actorId: number;
  roles: RoleType[];
}

export interface TaskIdResponse {
  taskId: string;
}

export interface TaskStatusResponse {
  status: TaskStatus;
}

// ─── Internal API response wrappers ──────────────────────────────────────────

export interface MailboxListAPIResponse {
  resources: ResourceShort[];
  page: number;
  perPage: number;
  total: number;
}

export interface ActorListAPIResponse {
  actors: Actor[];
}

export interface ResourceListAPIResponse {
  resources: Resource[];
}

export interface ResourceIdAPIResponse {
  resourceId: number;
}

export interface RemovedAlias {
  alias: string;
  removed: boolean;
}

export interface RemovedElement {
  id: number;
  removed: boolean;
}

export enum ActionTypes {
  drop = "drop",
  forward = "forward",
}

export enum ContactTypes {
  staff = "staff",
  email = "email",
  phone_extension = "phone_extension",
  phone = "phone",
  site = "site",
  icq = "icq",
  twitter = "twitter",
  skype = "skype",
}

export enum DepartmentsOrderBy {
  id = "id",
  name = "name",
}

export enum DirectionTypes {
  inbound = "inbound",
  outbound = "outbound",
}

export enum DNSRecordTypes {
  A = "A",
  AAAA = "AAAA",
  CNAME = "CNAME",
  MX = "MX",
  TXT = "TXT",
  SRV = "SRV",
  NS = "NS",
  CAA = "CAA",
}

export enum EventType {
  FsCopy = "fs-copy",
  FsMkdir = "fs-mkdir",
  FsMove = "fs-move",
  FsSetPublic = "fs-set-public",
  FsStore = "fs-store",
  FsTrashAppend = "fs-trash-append",
  FsTrashDrop = "fs-trash-drop",
  FsTrashDropAll = "fs-trash-drop-all",
  ShareActivateInvite = "share-activate-invite",
  ShareChangeRights = "share-change-rights",
  ShareChangeInviteRights = "share-change-invite-rights",
  ShareCreateGroup = "share-create-group",
  ShareInviteUser = "share-invite-user",
  FsRm = "fs-rm",
  FsSetPublicSettings = "fs-set-public-settings",
}

export enum Gender {
  male = "male",
  female = "female",
}

export enum Languages {
  ru = "ru",
  en = "en",
  ua = "ua",
  by = "by",
  tr = "tr",
}

export enum MemberTypes {
  user = "user",
  group = "group",
  department = "department",
}

export enum SignPositions {
  bottom = "bottom",
  under = "under",
}

export enum TaskStatus {
  Running = "running",
  Complete = "complete",
  Error = "error",
}

export enum NotifyType {
  All = "all",
  Delegates = "delegates",
  None = "none",
}

export enum ResourceType {
  Shared = "shared",
  Delegated = "delegated",
}

export enum RoleType {
  SharedMailboxOwner = "shared_mailbox_owner",
  SharedMailboxImapAdmin = "shared_mailbox_imap_admin",
  SharedMailboxSender = "shared_mailbox_sender",
  SharedMailboxHalfSender = "shared_mailbox_half_sender",
}

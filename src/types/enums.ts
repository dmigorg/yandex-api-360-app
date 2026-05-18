export enum ActionTypes {
  /** Do not deliver the message */
  drop = "drop",
  /** Forward the message to another address */
  forward = "forward",
}

export enum ContactTypes {
  /** Internal staff directory entry */
  staff = "staff",
  /** Email address */
  email = "email",
  /** Internal phone extension */
  phone_extension = "phone_extension",
  /** Phone number */
  phone = "phone",
  /** Website URL */
  site = "site",
  /** ICQ number */
  icq = "icq",
  /** Twitter handle */
  twitter = "twitter",
  /** Skype username */
  skype = "skype",
}

export enum DepartmentsOrderBy {
  /** Sort by department ID */
  id = "id",
  /** Sort by department name */
  name = "name",
}

export enum DirectionTypes {
  /** Incoming mail */
  inbound = "inbound",
  /** Outgoing mail */
  outbound = "outbound",
}

export enum DNSRecordTypes {
  /** IPv4 address record */
  A = "A",
  /** IPv6 address record */
  AAAA = "AAAA",
  /** Canonical name record (alias) */
  CNAME = "CNAME",
  /** Mail exchange record */
  MX = "MX",
  /** Text record */
  TXT = "TXT",
  /** Service locator record */
  SRV = "SRV",
  /** Name server record */
  NS = "NS",
  /** Certification Authority Authorization record */
  CAA = "CAA",
}

/** Disk audit log event types */
export enum EventType {
  /** File or folder was copied */
  FsCopy = "fs-copy",
  /** Directory was created */
  FsMkdir = "fs-mkdir",
  /** File or folder was moved or renamed */
  FsMove = "fs-move",
  /** File was published (made public) */
  FsSetPublic = "fs-set-public",
  /** File was uploaded */
  FsStore = "fs-store",
  /** File or folder was moved to trash */
  FsTrashAppend = "fs-trash-append",
  /** A single item was permanently deleted from trash */
  FsTrashDrop = "fs-trash-drop",
  /** All items were permanently deleted from trash */
  FsTrashDropAll = "fs-trash-drop-all",
  /** Shared folder invite was accepted */
  ShareActivateInvite = "share-activate-invite",
  /** Permissions on a shared folder were changed */
  ShareChangeRights = "share-change-rights",
  /** Permissions on a pending invite were changed */
  ShareChangeInviteRights = "share-change-invite-rights",
  /** A shared folder group was created */
  ShareCreateGroup = "share-create-group",
  /** A user was invited to a shared folder */
  ShareInviteUser = "share-invite-user",
  /** File or folder was permanently deleted (not via trash) */
  FsRm = "fs-rm",
  /** Public sharing settings were changed */
  FsSetPublicSettings = "fs-set-public-settings",
}

/** Mail audit log event types */
export enum MailEventType {
  /** An email was sent from a mailbox */
  MailboxSend = "mailbox_send",
  /** An email was received by a mailbox */
  MessageReceive = "message_receive",
  /** A message was marked as read */
  MessageSeen = "message_seen",
  /** A message was marked as unread */
  MessageUnseen = "message_unseen",
  /** A message was forwarded */
  MessageForward = "message_forward",
  /** A message was permanently deleted */
  MessagePurge = "message_purge",
  /** A message was moved to trash */
  MessageTrash = "message_trash",
  /** A message was marked as spam */
  MessageSpam = "message_spam",
  /** A spam mark was removed from a message */
  MessageUnspam = "message_unspam",
  /** A message was moved to another folder */
  MessageMove = "message_move",
  /** A message was copied to another folder */
  MessageCopy = "message_copy",
  /** A reply was sent to a message */
  MessageAnswer = "message_answer",
}

export enum Gender {
  male = "male",
  female = "female",
}

export enum Languages {
  /** Russian */
  ru = "ru",
  /** English */
  en = "en",
  /** Ukrainian */
  ua = "ua",
  /** Belarusian */
  by = "by",
  /** Turkish */
  tr = "tr",
}

export enum MemberTypes {
  /** Directory user */
  user = "user",
  /** Group */
  group = "group",
  /** Department */
  department = "department",
}

export enum SignPositions {
  /** Signature placed at the very bottom of the message */
  bottom = "bottom",
  /** Signature placed directly under the reply text */
  under = "under",
}

export enum TaskStatus {
  /** Task is currently in progress */
  Running = "running",
  /** Task completed successfully */
  Complete = "complete",
  /** Task failed */
  Error = "error",
}

export enum NotifyType {
  /** Notify all participants (owner and delegates) */
  All = "all",
  /** Notify delegates only */
  Delegates = "delegates",
  /** Do not send notifications */
  None = "none",
}

export enum ResourceType {
  /** Shared mailbox */
  Shared = "shared",
  /** Delegated (personal) mailbox with delegated access */
  Delegated = "delegated",
}

export enum RoleType {
  /** Full ownership of the shared mailbox */
  SharedMailboxOwner = "shared_mailbox_owner",
  /** IMAP administration access */
  SharedMailboxImapAdmin = "shared_mailbox_imap_admin",
  /** Can send mail as the mailbox address */
  SharedMailboxSender = "shared_mailbox_sender",
  /** Can send mail on behalf of the mailbox address */
  SharedMailboxHalfSender = "shared_mailbox_half_sender",
  /** Read-only access to the mailbox */
  SharedMailboxReader = "shared_mailbox_reader",
  /** Read and write access (cannot send) */
  SharedMailboxEditor = "shared_mailbox_editor",
  /** Administrative access (manage members and settings) */
  SharedMailboxAdmin = "shared_mailbox_admin",
}

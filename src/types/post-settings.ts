import type { Languages, SignPositions } from "./enums.js";

/** A mail signature */
export interface Sign {
  /** Email addresses this signature applies to */
  emails: string[];
  /** This signature is used by default */
  isDefault: boolean;
  /** Signature text (may contain HTML) */
  text: string;
  /** Language of the signature */
  lang: Languages;
}

/** Personal sender settings for a user's mailbox */
export interface UserPersonalSettings {
  /** Display name shown in the From field */
  fromName?: string;
  /** Default From address */
  defaultFrom?: string;
  /** List of configured signatures */
  signs?: Sign[];
  /** Where the signature is inserted relative to the reply */
  signPosition?: SignPositions;
}

/** Whether the mailbox automatically collects addresses from incoming mail */
export interface CollectAddressStatus {
  /** `true` if address auto-collection is enabled */
  collectAddresses: boolean;
}

/** An autoreply mail rule */
export interface AutoreplyRule {
  /** Unique rule identifier */
  ruleId: number;
  /** Human-readable rule name */
  ruleName: string;
  /** Autoreply message text */
  text: string;
}

/** A mail forwarding rule */
export interface ForwardRule {
  /** Unique rule identifier */
  ruleId: number;
  /** Target email address for forwarding */
  address: string;
  /** Human-readable rule name */
  ruleName: string;
  /** Keep a copy of the message in the original mailbox after forwarding */
  withStore: boolean;
}

/** A user mail rule — either an autoreply or a forwarding rule */
export interface UserRule {
  autoreply?: AutoreplyRule;
  forward?: ForwardRule;
}

/** All mail rules for a user */
export interface UserRulesList {
  autoreplies: AutoreplyRule[];
  forwards: ForwardRule[];
}

/** Response after creating a new user mail rule */
export interface UserRuleAddResponse {
  /** Identifier of the newly created rule */
  ruleId: number;
}

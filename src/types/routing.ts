import type { ActionTypes, DirectionTypes } from "./enums.js";

/** Extra data attached to a `forward` action */
export interface ActionData {
  /** Email address to forward the message to */
  email: string;
}

/** A single action executed when a routing rule matches */
export interface Action {
  /** Action to perform on the message */
  action: ActionTypes;
  /** Additional parameters (required when `action` is `forward`) */
  data?: ActionData;
}

/** Defines which mail flow a routing rule applies to */
export interface Scope {
  /** Mail direction this rule operates on */
  direction: DirectionTypes;
}

/** A mail routing rule */
export interface Rule {
  /** Actions to execute when the rule condition is satisfied */
  actions: Action[];
  /** Condition expression (structure depends on the rule type) */
  condition: unknown;
  /** Mail flow scope this rule applies to */
  scope: Scope;
  /** Stop evaluating further rules when this rule matches */
  terminal: boolean;
}

/** A set of mail routing rules */
export interface RulesList {
  rules: Rule[];
}

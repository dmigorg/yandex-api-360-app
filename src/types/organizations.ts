/** An organisation registered in Yandex 360 */
export interface Organization {
  /** Unique numeric organisation identifier */
  id: number;
  /** Organisation display name */
  name: string;
  /** Contact email address */
  email: string;
  /** Contact phone number */
  phone?: string;
  /** Fax number */
  fax?: string;
  /** Default interface language */
  language?: string;
  /** Active subscription plan */
  subscriptionPlan?: string;
}

/** Paginated list of organisations (cursor-based) */
export interface OrganizationList {
  organizations: Organization[];
  /** Cursor token for the next page; absent on the last page */
  nextPageToken?: string;
}

/** Fields shared between create and read representations of a department */
export interface BaseDepartment {
  /** Human-readable description */
  description?: string;
  /** Arbitrary external identifier for integration purposes */
  externalId?: string;
  /** User ID of the department head */
  headId?: number;
  /** Email alias label (part before `@`) */
  label?: string;
  /** Department display name */
  name: string;
  /** ID of the parent department (`0` for root-level departments) */
  parentId: number;
}

/** Full department object as returned by the API */
export interface Department extends BaseDepartment {
  /** Email aliases of the department */
  aliases: string[];
  /** ISO 8601 timestamp of creation */
  createdAt: string;
  /** Primary email address of the department */
  email: string;
  /** Internal email object identifier (string uint64) */
  emailId?: string;
  /** Unique numeric department identifier */
  id: number;
  /** Number of direct members */
  membersCount: number;
}

/** Compact department object used inside group member lists */
export interface DepartmentShort {
  id: number;
  membersCount: number;
  name: string;
}

/** Paginated list of departments */
export interface DepartmentsList {
  departments: Department[];
  /** Current page number (1-based) */
  page: number;
  /** Total number of pages */
  pages: number;
  /** Items per page */
  perPage: number;
  /** Total number of departments */
  total: number;
}

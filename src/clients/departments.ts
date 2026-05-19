import { BaseClient } from "../base-client.js";
import { ValidationError } from "../errors.js";
import type {
  BaseDepartment,
  Department,
  DepartmentEdit,
  DepartmentsList,
  RemovedAlias,
  RemovedElement,
} from "../types/index.js";
import { DepartmentsOrderBy } from "../types/index.js";

export class DepartmentsClient extends BaseClient {
  /**
   * Returns paginated list of departments.
   * @param page - Page number (1-based)
   * @param perPage - Items per page
   * @param parentId - Filter by parent department ID
   * @param orderBy - Sort field: `id` or `name`
   * @returns Paginated department list
   * @throws {APIRequestError} On HTTP error response
   */
  async getList(
    page = 1,
    perPage = 10,
    parentId?: number,
    orderBy: DepartmentsOrderBy = DepartmentsOrderBy.id,
  ): Promise<DepartmentsList> {
    const url = new URL(this.options.urlDepartments);
    url.searchParams.set("page", String(page));
    url.searchParams.set("perPage", String(perPage));
    url.searchParams.set("orderBy", orderBy);
    if (parentId != null) url.searchParams.set("parentId", String(parentId));
    return this.httpGet<DepartmentsList>(url.toString());
  }

  /**
   * Returns all departments, fetching all pages automatically.
   * @param parentId - Filter by parent department ID
   * @param orderBy - Sort field
   * @returns Array of all departments
   * @throws {APIRequestError} On HTTP error response
   */
  async getAll(parentId?: number, orderBy = DepartmentsOrderBy.id): Promise<Department[]> {
    const result: Department[] = [];
    let response = await this.getList(1, this.options.maxResponseCount, parentId, orderBy);
    result.push(...response.departments);
    for (let i = 2; i <= response.pages; i++) {
      response = await this.getList(i, this.options.maxResponseCount, parentId, orderBy);
      result.push(...response.departments);
    }
    return result;
  }

  /**
   * Returns a single department by ID.
   * @param departmentId - Department identifier
   * @returns Department object
   * @throws {APIRequestError} On HTTP error response
   */
  async getById(departmentId: number): Promise<Department> {
    return this.httpGet<Department>(`${this.options.urlDepartments}/${departmentId}`);
  }

  /**
   * Creates a new department.
   * @param department - Department data to create
   * @returns Created department object
   * @throws {ValidationError} If `department` is null or undefined
   * @throws {APIRequestError} On HTTP error response
   */
  async add(department: BaseDepartment): Promise<Department> {
    if (!department) throw new ValidationError("department is required");
    return this.httpPost<Department>(this.options.urlDepartments, department);
  }

  /**
   * Updates department fields (only provided fields are changed).
   * @param department - Department with updated fields; must include `id`
   * @returns Updated department object
   * @throws {ValidationError} If `department` is null or undefined
   * @throws {APIRequestError} On HTTP error response
   */
  async edit(department: DepartmentEdit): Promise<Department> {
    if (!department) throw new ValidationError("department is required");
    const { id, ...fields } = department;
    return this.httpPatch<Department>(`${this.options.urlDepartments}/${id}`, fields);
  }

  /**
   * Deletes a department (must be empty, no members or sub-departments).
   * @param departmentId - Department identifier
   * @returns `true` if deleted
   * @throws {APIRequestError} On HTTP error response
   */
  async remove(departmentId: number): Promise<boolean> {
    const result = await this.httpDelete<RemovedElement>(
      `${this.options.urlDepartments}/${departmentId}`,
    );
    return result.removed;
  }

  /**
   * Adds an email alias to a department.
   * @param departmentId - Department identifier
   * @param alias - Alias name (e.g. `support` for `support@domain.ru`)
   * @returns Updated department object
   * @throws {ValidationError} If `alias` is empty
   * @throws {APIRequestError} On HTTP error response
   */
  async addAlias(departmentId: number, alias: string): Promise<Department> {
    if (!alias) throw new ValidationError("alias is required");
    return this.httpPost<Department>(`${this.options.urlDepartments}/${departmentId}/aliases`, {
      alias,
    });
  }

  /**
   * Removes an email alias from a department.
   * @param departmentId - Department identifier
   * @param alias - Alias to remove
   * @returns `true` if removed
   * @throws {ValidationError} If `alias` is empty
   * @throws {APIRequestError} On HTTP error response
   */
  async deleteAlias(departmentId: number, alias: string): Promise<boolean> {
    if (!alias) throw new ValidationError("alias is required");
    const result = await this.httpDelete<RemovedAlias>(
      `${this.options.urlDepartments}/${departmentId}/aliases/${alias}`,
    );
    return result.removed;
  }
}

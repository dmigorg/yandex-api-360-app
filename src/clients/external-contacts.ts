import { BaseClient } from "../base-client.js";
import type {
  ExternalContact,
  ExternalContactCreate,
  ExternalContactEmail,
  ExternalContactList,
  ExternalContactPhone,
  ExternalContactUpdate,
} from "../types/index.js";

export class ExternalContactsClient extends BaseClient {
  /**
   * Returns a paginated list of external contacts for the organization.
   * @param page - Page number (1-based)
   * @param perPage - Items per page
   * @returns Paginated external contact list
   */
  async getList(page = 1, perPage = 10): Promise<ExternalContactList> {
    return this.httpGet<ExternalContactList>(
      `${this.options.urlExternalContacts}?page=${page}&perPage=${perPage}`,
    );
  }

  /**
   * Returns all external contacts, fetching all pages automatically.
   * @returns Array of all external contacts
   */
  async getAll(): Promise<ExternalContact[]> {
    const result: ExternalContact[] = [];
    let response = await this.getList(1, this.options.maxResponseCount);
    result.push(...response.contacts);
    for (let i = 2; i <= response.pages; i++) {
      response = await this.getList(i, this.options.maxResponseCount);
      result.push(...response.contacts);
    }
    return result;
  }

  /**
   * Returns a single external contact by ID.
   * @param contactId - External contact identifier
   * @returns External contact object
   */
  async getById(contactId: string): Promise<ExternalContact> {
    return this.httpGet<ExternalContact>(`${this.options.urlExternalContacts}/${contactId}`);
  }

  /**
   * Creates a new external contact. At least one email address is required.
   * @param contact - Contact data to create
   * @returns ID of the created contact
   * @throws {APIRequestError} On validation error or insufficient permissions
   */
  async add(contact: ExternalContactCreate): Promise<string> {
    if (!contact) throw new Error("contact is required");
    const result = await this.httpPost<{ id: string }>(this.options.urlExternalContacts, contact);
    return result.id;
  }

  /**
   * Updates descriptive fields of an external contact (name, title, company, etc.).
   * Email addresses and phones must be updated via `updateEmails` / `updatePhones`.
   * @param contactId - External contact identifier
   * @param data - Fields to update (only provided fields are changed)
   * @returns ID of the updated contact
   */
  async update(contactId: string, data: ExternalContactUpdate): Promise<string> {
    if (!contactId) throw new Error("contactId is required");
    const result = await this.httpPatch<{ id: string }>(
      `${this.options.urlExternalContacts}/${contactId}`,
      data,
    );
    return result.id;
  }

  /**
   * Deletes an external contact.
   * @param contactId - External contact identifier
   */
  async remove(contactId: string): Promise<void> {
    if (!contactId) throw new Error("contactId is required");
    await this.httpDelete(`${this.options.urlExternalContacts}/${contactId}`);
  }

  /**
   * Replaces all email addresses of an external contact.
   * The new list must not be empty and must contain exactly one entry with `main: true`.
   * @param contactId - External contact identifier
   * @param emails - New email list
   * @returns ID of the updated contact
   */
  async updateEmails(contactId: string, emails: ExternalContactEmail[]): Promise<string> {
    if (!contactId) throw new Error("contactId is required");
    if (!emails?.length) throw new Error("emails must not be empty");
    const result = await this.httpPut<{ id: string }>(
      `${this.options.urlExternalContacts}/${contactId}/emails`,
      { emails },
    );
    return result.id;
  }

  /**
   * Replaces all phone numbers of an external contact.
   * The new list may be empty. At most one entry may have `main: true`.
   * @param contactId - External contact identifier
   * @param phones - New phone list (may be empty to clear all phones)
   * @returns ID of the updated contact
   */
  async updatePhones(contactId: string, phones: ExternalContactPhone[]): Promise<string> {
    if (!contactId) throw new Error("contactId is required");
    const result = await this.httpPut<{ id: string }>(
      `${this.options.urlExternalContacts}/${contactId}/phones`,
      { phones },
    );
    return result.id;
  }
}

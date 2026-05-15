import { BaseClient } from "../base-client.js";
import type { Api360Options } from "../options.js";
import type { PasswordParameters } from "../types/index.js";

export class PasswordManagementClient extends BaseClient {
  constructor(options: Api360Options) {
    super(options);
  }

  async getParameters(): Promise<PasswordParameters> {
    return this.httpGet<PasswordParameters>(this.options.urlPasswords);
  }

  async setParameters(parameters: PasswordParameters): Promise<PasswordParameters> {
    if (!parameters) throw new Error("parameters is required");
    return this.httpPut<PasswordParameters>(this.options.urlPasswords, parameters);
  }
}

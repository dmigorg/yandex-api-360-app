import { BaseClient } from "../base-client.js";
import type { Api360Options } from "../options.js";
import type { WhiteList } from "../types/index.js";

export class AntispamClient extends BaseClient {
  constructor(options: Api360Options) {
    super(options);
  }

  async getAllowList(): Promise<string[]> {
    const result = await this.httpGet<WhiteList>(this.options.urlAntispam);
    return result.allowList;
  }

  async setAllowList(allowList: string[]): Promise<void> {
    await this.httpPost<unknown>(this.options.urlAntispam, { allowList });
  }

  async deleteAllowList(): Promise<void> {
    await this.httpDelete(this.options.urlAntispam);
  }
}

import { type FetchChatworkResult, fetchChatwork } from "../httpClient";
import type { Account } from "../model/account";

export class MeRepository {
  constructor(private readonly apiToken: string) {}

  /**
   * 自分の情報を取得する
   *
   * @see https://developer.chatwork.com/reference/get-me
   *  */
  get(): FetchChatworkResult<Account> {
    return fetchChatwork({
      apiToken: this.apiToken,
      method: "get",
      path: "/me",
    });
  }
}

import { type FetchChatworkResult, fetchChatwork } from "../httpClient";
import type { Contact } from "../model/contact";

export class ContactsRepository {
  constructor(private readonly apiToken: string) {}

  /**
   * コンタクト一覧を取得する
   *
   * @see https://developer.chatwork.com/reference/get-contacts
   */
  get(): FetchChatworkResult<Contact[]> {
    return fetchChatwork({
      apiToken: this.apiToken,
      method: "get",
      path: "/contacts",
    });
  }
}

import { type FetchChatworkResult, fetchChatwork } from "../../httpClient";
import type { Message } from "../../model/message";

export class RoomMessagesRepository {
  constructor(
    private readonly apiToken: string,
    private readonly roomId: number
  ) {}

  /**
   * チャットのメッセージ一覧を取得する
   *
   * @see https://developer.chatwork.com/reference/get-rooms-room_id-messages
   */
  get(): FetchChatworkResult<Message> {
    return fetchChatwork({
      apiToken: this.apiToken,
      method: "get",
      path: `/rooms/${this.roomId}/messages`,
    });
  }
}

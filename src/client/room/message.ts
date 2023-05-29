import { type FetchChatworkResult, fetchChatwork } from "../../httpClient";
import type { Message } from "../../model/message";

export type PutMessageParams = {
  /** 更新するメッセージ本文 */
  body: string;
};

export type PutMessageResponse = Pick<Message, "message_id">;

export type DeleteMessageResponse = Pick<Message, "message_id">;

export class MessageRepository {
  constructor(
    private readonly apiToken: string,
    private readonly roomId: number,
    private readonly messageId: string
  ) {}

  /**
   * チャットのメッセージを取得する
   *
   * @see https://developer.chatwork.com/reference/get-rooms-room_id-messages-message_id
   */
  get(): FetchChatworkResult<Message> {
    return fetchChatwork({
      apiToken: this.apiToken,
      method: "get",
      path: `/rooms/${this.roomId}/messages/${this.messageId}`,
    });
  }

  /**
   * チャットのメッセージを更新する
   *
   * @see https://developer.chatwork.com/reference/put-rooms-room_id-messages-message_id
   */
  put(params: PutMessageParams): FetchChatworkResult<PutMessageResponse> {
    return fetchChatwork({
      apiToken: this.apiToken,
      method: "put",
      path: `/rooms/${this.roomId}/messages/${this.messageId}`,
      params,
    });
  }

  /**
   * チャットのメッセージを削除する
   *
   * @see https://developer.chatwork.com/reference/delete-rooms-room_id-messages-message_id
   */
  delete(): FetchChatworkResult<DeleteMessageResponse> {
    return fetchChatwork({
      apiToken: this.apiToken,
      method: "delete",
      path: `/rooms/${this.roomId}/messages/${this.messageId}`,
    });
  }
}

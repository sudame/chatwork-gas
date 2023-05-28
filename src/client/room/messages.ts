import { type FetchChatworkResult, fetchChatwork } from "../../httpClient";
import type { Message } from "../../model/message";

export type GetRoomMessagesParams = {
  /**
   * 強制的に最大件数まで取得するかどうか。
   * 0を指定した場合（既定）は前回取得分からの差分のみを返しますが、1を指定した場合は強制的に最新のメッセージを最大100件まで取得します。
   */
  forece: number;
};

export type PostRoomMessagesParams = {
  /** メッセージ本文 */
  body: string;
  /**
   * 投稿するメッセージを自分から見て未読にするか。
   * 0を指定した場合（既定）は既読、1を指定した場合は未読にします。
   */
  self_unread?: 0 | 1;
};

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
  get(params?: GetRoomMessagesParams): FetchChatworkResult<Message[]> {
    return fetchChatwork({
      apiToken: this.apiToken,
      method: "get",
      path: `/rooms/${this.roomId}/messages`,
      params,
    });
  }

  /**
   * チャットにメッセージを投稿する
   *
   * @see https://developer.chatwork.com/reference/post-rooms-room_id-messages
   */
  post(
    params: PostRoomMessagesParams
  ): FetchChatworkResult<Pick<Message, "message_id">> {
    return fetchChatwork({
      apiToken: this.apiToken,
      method: "post",
      path: `/rooms/${this.roomId}/messages`,
      params,
    });
  }
}

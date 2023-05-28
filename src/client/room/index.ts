import { type FetchChatworkResult, fetchChatwork } from "../../httpClient";
import type { Room } from "../../model/room";
import { RoomMessagesRepository } from "./messages";

export class RoomRepository {
  public readonly messages: RoomMessagesRepository;

  constructor(
    private readonly apiToken: string,
    private readonly roomId: number
  ) {
    this.messages = new RoomMessagesRepository(apiToken, roomId);
  }

  /**
   * チャットの情報を取得する
   *
   * @see https://developer.chatwork.com/reference/get-rooms-room_id
   */
  get(): FetchChatworkResult<Room> {
    return fetchChatwork({
      apiToken: this.apiToken,
      method: "get",
      path: `/rooms/${this.roomId}`,
    });
  }
}

import { type FetchChatworkResult, fetchChatwork } from "../../httpClient";
import type { Room } from "../../model/room";

export class RoomRepository {
  constructor(
    private readonly apiToken: string,
    private readonly roomId: number
  ) {}

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

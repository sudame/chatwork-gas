import { type FetchChatworkResult, fetchChatwork } from "../httpClient";
import type { RoomInList } from "../model/room";
import { RoomRepository } from "./room";

export class RoomsRepository {
  constructor(private readonly apiToken: string) {}

  /** 個々のチャットの情報を取得する */
  roomId(roomId: number): RoomRepository {
    return new RoomRepository(this.apiToken, roomId);
  }

  /**
   * チャット一覧を取得する
   *
   * @see https://developer.chatwork.com/reference/get-rooms
   *  */
  get(): FetchChatworkResult<RoomInList[]> {
    return fetchChatwork({
      apiToken: this.apiToken,
      method: "get",
      path: "/rooms",
    });
  }
}

import { type FetchChatworkResult, fetchChatwork } from "../httpClient";
import type { Room, RoomIconPreset, RoomInList } from "../model/room";
import { RoomRepository } from "./room";

export type PostRoomsParams = {
  name: string;
  description?: string;
  link?: 0 | 1;
  link_code?: string;
  link_need_acceptance?: 0 | 1;
  members_admin_ids: string;
  members_member_ids: string;
  members_readonly_ids: string;
  icon_preset: RoomIconPreset;
};

export type PostRoomsResponse = Pick<Room, "room_id">;

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

  /**
   * グループチャットを作成する
   *
   * @see https://developer.chatwork.com/reference/post-rooms
   */
  post(params: PostRoomsParams): FetchChatworkResult<PostRoomsResponse> {
    return fetchChatwork({
      apiToken: this.apiToken,
      method: "post",
      path: "/rooms",
      params,
    });
  }
}

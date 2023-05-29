import { type FetchChatworkResult, fetchChatwork } from "../../httpClient";
import type { Room, RoomIconPreset } from "../../model/room";
import { RoomMembersRepository } from "./members";
import { RoomMessagesRepository } from "./messages";
import { RoomTasksRepository } from "./tasks";

export type PutRoomParams = {
  /** チャットの名前 */
  name?: string;
  /** チャットの概要 */
  description?: string;
  /** チャットのアイコンの種類 */
  icon_preset?: RoomIconPreset;
};

export type PutRoomResponse = Pick<Room, "room_id">;

export type DeleteRoomParams = {
  /** 操作の種類 */
  action_type: "leave" | "delete";
};

export class RoomRepository {
  public readonly messages: RoomMessagesRepository;
  public readonly tasks: RoomTasksRepository;
  public readonly members: RoomMembersRepository;

  constructor(
    private readonly apiToken: string,
    private readonly roomId: number
  ) {
    this.messages = new RoomMessagesRepository(apiToken, roomId);
    this.tasks = new RoomTasksRepository(apiToken, roomId);
    this.members = new RoomMembersRepository(apiToken, roomId);
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

  /**
   * チャットの情報を変更する
   *
   * @see https://developer.chatwork.com/reference/put-rooms-room_id
   */
  put(params: PutRoomParams): FetchChatworkResult<PutRoomParams> {
    return fetchChatwork({
      apiToken: this.apiToken,
      method: "put",
      path: `/rooms/${this.roomId}`,
      params,
    });
  }

  /**
   * グループチャットを退席、または削除します。
   * グループチャットを退席すると、このグループチャットにある自分が担当のタスク、および自分が送信したファイルがすべて削除されます。
   * グループチャットを削除すると、このグループチャットにあるメッセージ、タスク、ファイルがすべて削除されます。
   * （一度削除すると元に戻せません。）
   *
   * @see https://developer.chatwork.com/reference/delete-rooms-room_id
   */
  delete(params: DeleteRoomParams): FetchChatworkResult<[]> {
    return fetchChatwork({
      apiToken: this.apiToken,
      method: "delete",
      path: `/rooms/${this.roomId}`,
      params,
    });
  }
}

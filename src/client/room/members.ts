import { type FetchChatworkResult, fetchChatwork } from "../../httpClient";
import type { RoomMember } from "../../model/roomMember";

export type PutRoomMembersParams = {
  /**
   * 管理者権限にしたいユーザーの一覧。
   * コンタクト済みもしくは組織内のユーザーのアカウントIDをカンマ区切りで指定してください。少なくとも1人以上のユーザーを指定する必要があります。
   */
  members_admin_ids: string;
  /**
   * メンバー権限にしたいユーザーの一覧。
   * コンタクト済みもしくは組織内のユーザーのアカウントIDをカンマ区切りで指定してください。
   */
  members_member_ids?: string;
  /**
   * 閲覧のみ権限にしたいユーザーの一覧。
   * コンタクト済みもしくは組織内のユーザーのアカウントIDをカンマ区切りで指定してください。
   */
  members_readonly_ids?: string;
};

export type PutRoomMembersResponse = {
  admin: number[];
  member: number[];
  readonly: number[];
};

export class RoomMembersRepository {
  constructor(
    private readonly apiToken: string,
    private readonly roomId: number
  ) {}

  /**
   * チャットのメンバー一覧を取得します。
   *
   * @see https://developer.chatwork.com/reference/get-rooms-room_id-members
   */
  get(): FetchChatworkResult<RoomMember[]> {
    return fetchChatwork({
      apiToken: this.apiToken,
      method: "get",
      path: `/rooms/${this.roomId}/members`,
    });
  }

  /**
   * チャットのメンバーを一括で変更します。
   *
   * @see https://developer.chatwork.com/reference/put-rooms-room_id-members
   */
  put(
    params: PutRoomMembersParams
  ): FetchChatworkResult<PutRoomMembersResponse> {
    return fetchChatwork({
      apiToken: this.apiToken,
      method: "put",
      path: `/rooms/${this.roomId}/members`,
      params,
    });
  }
}

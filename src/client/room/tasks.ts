import { type FetchChatworkResult, fetchChatwork } from "../../httpClient";
import type { Task, TaskStatus } from "../../model/task";

export type GetRoomTasksParams = {
  /** タスクの担当者のアカウントID */
  account_id: number;
  /** タスクの依頼者のアカウントID */
  assigned_by_account_id: number;
  /** タスクの完了状態 */
  status: TaskStatus;
};

export type PostRoomTasksParams = {
  /** タスクの内容 */
  body: string;
  /** 担当者にしたいユーザーの一覧。チャットに所属しているユーザーのアカウントIDをカンマ区切りで指定してください。 */
  to_ids: string;
  /** タスクの期限。Unix時間（秒）で指定してください。 */
  limit?: number;
  /**
   * タスクの期限の種類。
   *
   * - `none` を指定した場合は期限なしのタスクを作成します。
   * - `date` を指定した場合は日付期限のタスクを作成します。
   * - `time` を指定した場合は時間期限のタスクを作成します。
   *
   * Default: `time`
   */
  limit_type?: "none" | "date" | "time";
};

export class RoomTasksRepository {
  constructor(
    private readonly apiToken: string,
    private readonly roomId: number
  ) {}

  /**
   * チャットのタスク一覧を取得する
   *
   * @see https://developer.chatwork.com/reference/get-rooms-room_id-tasks
   */
  get(params?: GetRoomTasksParams): FetchChatworkResult<Task[]> {
    return fetchChatwork({
      apiToken: this.apiToken,
      method: "get",
      path: `/rooms/${this.roomId}/tasks`,
      params,
    });
  }

  /**
   * チャットにタスクを追加する
   *
   * @see https://developer.chatwork.com/reference/post-rooms-room_id-tasks
   */
  post(params: PostRoomTasksParams): FetchChatworkResult<Task> {
    return fetchChatwork({
      apiToken: this.apiToken,
      method: "post",
      path: `/rooms/${this.roomId}/tasks`,
      params,
    });
  }
}

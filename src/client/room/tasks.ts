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
}

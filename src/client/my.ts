import { fetchChatwork, type FetchChatworkResult } from "../httpClient";
import type { MyStatus, MyTask } from "../model/my";
import type { TaskStatus } from "../model/task";

class MyStatusRepository {
  constructor(private readonly apiToken: string) {}

  /**
   * 自分の未読数、未読To数、未完了タスク数を取得します。
   *
   * @see https://developer.chatwork.com/reference/get-my-status
   */
  get(): FetchChatworkResult<MyStatus> {
    return fetchChatwork({
      apiToken: this.apiToken,
      method: "get",
      path: "/my/status",
    });
  }
}

export type GetMyTasksParams = {
  /** タスクの依頼者のアカウントID */
  assigned_by_account_id?: number;
  /** タスクの完了状態 */
  status?: TaskStatus;
};

class MyTasksRepository {
  constructor(private readonly apiToken: string) {}

  /**
   * 自分のタスク一覧を最大100件まで取得します。
   *
   * @see https://developer.chatwork.com/reference/get-my-tasks
   */
  get(params: GetMyTasksParams): FetchChatworkResult<MyTask[]> {
    return fetchChatwork({
      apiToken: this.apiToken,
      method: "get",
      path: "/my/tasks",
      params,
    });
  }
}

export class MyRepository {
  public readonly status: MyStatusRepository;
  public readonly tasks: MyTasksRepository;

  constructor(apiToken: string) {
    this.status = new MyStatusRepository(apiToken);
    this.tasks = new MyTasksRepository(apiToken);
  }
}

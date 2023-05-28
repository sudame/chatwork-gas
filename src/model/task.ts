import type { Account } from "./account";

export type AccountInTask = Pick<
  Account,
  "account_id" | "name" | "avatar_image_url"
>;

export type TaskStatus = "open" | "done";

export type TaskLimitType = "none" | "date" | "time";

export type Task = {
  task_id: number;
  account: AccountInTask;
  assigned_by_account: AccountInTask;
  message_id: string;
  body: string;
  limit_time: number;
  status: TaskStatus;
  limit_type: TaskLimitType;
};

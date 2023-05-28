import type { Account } from "./account";

export type AccountInMessage = Pick<
  Account,
  "account_id" | "name" | "avatar_image_url"
>;

export type Message = {
  message_id: string;
  account: AccountInMessage;
  body: string;
  send_time: number;
  update_time: number;
};

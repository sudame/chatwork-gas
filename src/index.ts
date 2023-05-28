import { ChatworkClient } from "./client";

/**
 * Chatworkにログインする
 *
 * @param apiToken 利用者のAPIトークン
 * @returns ChatworkGASのクライアント
 *  */
export function login(apiToken: string): ChatworkClient {
  return new ChatworkClient(apiToken);
}

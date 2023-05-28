const BASE_URL = "https://api.chatwork.com/v2";

/** ChatworkのAPIを呼ぶための引数 */
export type FetchChatworkArgs = {
  /** APIトークン */
  apiToken: string;
  /** エンドポイントのパス(スラッシュ始まり, `/v2` は含まない) */
  path: string;
  /** HTTPメソッド */
  method: "post" | "get" | "delete" | "put";
  /** 追加のパラメータ */
  params?: Record<string, any>;
};

/** ChatworkのAPIから返されるレートリミットの情報 */
export type RateLimit = {
  limit: number;
  remaining: number;
  reset: number;
};

/**
 * ChatworkのAPIを呼んだ結果
 */
export type FetchChatworkResult<T = any> = {
  /** 一定期間におけるAPIの最大利用回数 */
  rateLimit: RateLimit;
  /** 一定期間におけるAPIの残り利用回数 */
  statusCode: number;
  /** API利用回数制限が次にリセットされる時間 (Unix時間) */
  data: T;
};

/**
 * Google Apps Scriptの機能を使ってChatworkのAPIを呼ぶ
 *
 * @param args ChatworkのAPIを呼ぶための引数
 * @returns ChatworkのAPIを呼んだ結果
 */
export function fetchChatwork<T>(
  args: FetchChatworkArgs
): FetchChatworkResult<T> {
  const url = BASE_URL + args.path;
  const response = UrlFetchApp.fetch(url, {
    method: args.method,
    headers: {
      "x-chatworktoken": args.apiToken,
    },
    muteHttpExceptions: true,
  });

  const headers: Record<string, any> = response.getHeaders();

  return {
    rateLimit: {
      limit: headers["x-ratelimit-limit"],
      remaining: headers["x-ratelimit-remaining"],
      reset: headers["x-ratelimit-rest"],
    },
    statusCode: response.getResponseCode(),
    data: JSON.parse(response.getContentText()),
  };
}

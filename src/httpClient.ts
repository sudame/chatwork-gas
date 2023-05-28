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
  params?: Record<string, string | number> | undefined;
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
  let url = BASE_URL + args.path;

  // HTTP GETリクエストの場合、URL末尾にパラメータ文字列を付与する
  if (args.params !== undefined && args.method === "get") {
    const keyEquealValue = Object.entries(args.params).map((keyValue) => {
      const [key, value] = keyValue;
      return `${key}=${value}`;
    });
    url = url + "?" + keyEquealValue.join("&");
  }

  const request: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: args.method,
    headers: {
      "x-chatworktoken": args.apiToken,
    },
    muteHttpExceptions: true,
  };

  // HTTP POST/PUTリクエストの場合、リクエストオブジェクトのpayloadにパラメータを付与する
  if (
    args.params !== undefined &&
    (args.method === "post" || args.method === "put")
  ) {
    const payload: GoogleAppsScript.URL_Fetch.Payload = {};
    Object.entries(args.params).forEach((keyValue) => {
      const [key, value] = keyValue;
      payload[key] = value;
    });
    request.payload = payload;
  }

  const response = UrlFetchApp.fetch(url, request);
  const headers: Record<string, any> = response.getHeaders();
  const responseText = response.getContentText();

  return {
    rateLimit: {
      limit: headers["x-ratelimit-limit"],
      remaining: headers["x-ratelimit-remaining"],
      reset: headers["x-ratelimit-rest"],
    },
    statusCode: response.getResponseCode(),
    data: JSON.parse(responseText === "" ? "[]" : responseText),
  };
}

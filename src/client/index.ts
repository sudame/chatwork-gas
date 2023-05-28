import { MeRepository } from "./me";
import { RoomsRepository } from "./rooms";

/** Chatworkのクライアント */
export class ChatworkClient {
  /** ログイン中のユーザー(自分自身)のアカウント情報を取得する */
  readonly me: MeRepository;
  /** チャットに関する情報を取得する */
  readonly rooms: RoomsRepository;

  constructor(apiToken: string) {
    this.me = new MeRepository(apiToken);
    this.rooms = new RoomsRepository(apiToken);
  }
}

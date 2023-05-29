import { ContactsRepository } from "./contacts";
import { MeRepository } from "./me";
import { MyRepository } from "./my";
import { RoomsRepository } from "./rooms";

/** Chatworkのクライアント */
export class ChatworkClient {
  /** ログイン中のユーザー(自分自身)のアカウント情報を取得する */
  readonly me: MeRepository;
  /** チャットに関する情報を取得する */
  readonly rooms: RoomsRepository;
  /** ログイン中のユーザー(自分自身)の状態やタスクの情報を取得する */
  readonly my: MyRepository;
  /** コンタクトの情報を取得する */
  readonly contacts: ContactsRepository;

  constructor(apiToken: string) {
    this.me = new MeRepository(apiToken);
    this.rooms = new RoomsRepository(apiToken);
    this.my = new MyRepository(apiToken);
    this.contacts = new ContactsRepository(apiToken);
  }
}

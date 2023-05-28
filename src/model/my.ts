import type { Task } from "./task";

export type MyStatus = {
  unread_room_num: number;
  mention_room_num: number;
  mytask_room_num: number;
  unread_num: number;
  mention_num: number;
  mytask_num: number;
};

type RoomInMyTask = {
  room_id: number;
  name: string;
  icon_path: string;
};

export type MyTask = Omit<Task, "account"> & { room: RoomInMyTask };

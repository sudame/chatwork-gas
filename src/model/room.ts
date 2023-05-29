export type RoomType = "my" | "direct" | "group";

export type RoomRole = "admin" | "member" | "readonly";

export type Room = {
  room_id: number;
  name: string;
  type: RoomType;
  role: RoomRole;
  sticky: boolean;
  unread_num: number;
  mention_num: number;
  mytask_num: number;
  message_num: number;
  file_num: number;
  task_num: number;
  icon_path: string;
  last_update_time: number;
  description: string;
};

export type RoomInList = Omit<Room, "description">;

export type RoomIconPreset =
  | "group"
  | "check"
  | "document"
  | "meeting"
  | "event"
  | "project"
  | "business"
  | "study"
  | "security"
  | "star"
  | "idea"
  | "heart"
  | "magcup"
  | "beer"
  | "music"
  | "sports"
  | "travel";

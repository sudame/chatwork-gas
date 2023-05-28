import type { RoomRole } from "./room";

export type RoomMember = {
  account_id: number;
  role: RoomRole;
  name: string;
  chatwork_id: string;
  organization_id: number;
  organization_name: string;
  department: string;
  avatar_image_url: string;
};

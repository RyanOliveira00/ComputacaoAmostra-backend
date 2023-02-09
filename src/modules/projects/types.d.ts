import { TUser, TVote } from '@app/modules';

export type TProject = {
  id: string;
  owner_id: TUser | TUser['id'];
  name: string;
  team: string[];
  votes: TVote[] | TVote['id'][];
  vote_count: number;
  status: boolean;
  github: string;
  youtube: string;
};

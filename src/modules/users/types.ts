import { TVote } from '../votes/types';

export type TUser = {
  id: string;
  email: string;
  name: string;
  vote_count: number;
  votes: string[] | TVote[];
  createdAt: Date;
};

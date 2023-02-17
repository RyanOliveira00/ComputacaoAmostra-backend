import { TUser } from '../users/types';
import { TVote } from '../votes/types';

export type TProject = {
  id: string;
  ownerId: TUser | TUser['id'];
  name: string;
  team: string[];
  votes: TVote[] | TVote['id'][];
  totalVotes: number;
  uniqueVotes: number;
  status: boolean;
  github: string;
  youtube: string;
  course: CourseEnum;
};

export enum CourseEnum {
  BCC = 'bcc',
  ECOMP = 'ecomp',
}

import { TUser, TVote } from '@app/modules';

export type TProject = {
  id: string;
  owner_id: TUser | TUser['id'];
  name: string;
  team: string[];
  votes: TVote[] | TVote['id'][];
  total_votes: number;
  unique_votes: number;
  status: boolean;
  github: string;
  youtube: string;
  course: CourseEnum;
};

export enum CourseEnum {
  BCC = 'bcc',
  ECOMP = 'ecomp',
}

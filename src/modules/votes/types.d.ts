import { TProject, TUser } from '@app/modules';

export type TVote = {
  id: string;
  user_id: TUser | TUser['id'];
  project_id: TProject | TProject['id'];
  createdAt: Date;
};

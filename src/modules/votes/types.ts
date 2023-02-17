import { TProject } from '../projects/types';
import { TUser } from '../users/types';

export type TVote = {
  id: string;
  user_id: TUser | TUser['id'];
  project_id: TProject | TProject['id'];
  createdAt: Date;
};

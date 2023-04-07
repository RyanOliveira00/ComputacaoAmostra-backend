import { TProject } from 'src/modules/projects/types';
import { TUser } from 'src/modules/users/types';

export type TVote = {
  id: string;
  userId: TUser | TUser['id'];
  projectId: TProject | TProject['id'];
  createdAt: Date;
};

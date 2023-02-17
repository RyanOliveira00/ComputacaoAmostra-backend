import { TProject } from '../projects/types';
import { TUser } from '../users/types';

export type TVote = {
  id: string;
  userId: TUser | TUser['id'];
  projectId: TProject | TProject['id'];
  createdAt: Date;
};

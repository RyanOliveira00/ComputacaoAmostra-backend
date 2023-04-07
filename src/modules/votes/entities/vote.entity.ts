import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from 'src/modules/projects/entities/project.entity';
import { TProject } from 'src/modules/projects/types';
import { User } from 'src/modules/users/entities/user.entity';
import { TUser } from 'src/modules/users/types';
import { TVote } from '../types';

@Entity({ name: 'votes' })
export class Vote implements TVote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.votes)
  userId: string | TUser;

  @ManyToOne(() => Project, (project) => project.votes)
  projectId: string | TProject;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}

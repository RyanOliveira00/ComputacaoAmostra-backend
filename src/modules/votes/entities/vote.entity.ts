import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TVote } from '../types';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';
import { TProject } from '../../projects/types';
import { TUser } from '../../users/types';

@Entity({ name: 'votes' })
export class Vote implements TVote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user_id: string | TUser;

  @ManyToOne(() => Project, (project) => project.votes)
  project_id: string | TProject;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}

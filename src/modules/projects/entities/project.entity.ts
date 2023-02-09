import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TProject } from '../types';
import { User } from '../../users/entities/user.entity';
import { Vote } from '../../votes/entities/vote.entity';
import { TUser } from 'src/modules/users/types';
import { TVote } from 'src/modules/votes/types';

@Entity({ name: 'projects' })
export class Project implements TProject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  owner_id: string | TUser;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', array: true })
  team: string[];

  @OneToMany(() => Vote, (vote) => vote.project_id)
  votes: string[] | TVote[];

  @Column({ default: 0, insert: false })
  vote_count: number;

  @Column({ default: true })
  status: boolean;

  @Column({ type: 'varchar' })
  github: string;

  @Column({ type: 'varchar' })
  youtube: string;
}

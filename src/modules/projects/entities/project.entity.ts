import { User } from 'src/modules/users/entities/user.entity';
import { TUser } from 'src/modules/users/types';
import { Vote } from 'src/modules/votes/entities/vote.entity';
import { TVote } from 'src/modules/votes/types';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseEnum, TProject } from '../types';

@Entity({ name: 'projects' })
export class Project implements TProject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', array: true })
  team: string[];

  @OneToMany(() => Vote, (vote) => vote.projectId)
  votes: string[] | TVote[];

  @Column({ default: 0, insert: false })
  totalVotes: number;

  @Column({ default: 0, insert: false })
  uniqueVotes: number;

  @Column({ default: true })
  status: boolean;

  @Column({ type: 'varchar' })
  github: string;

  @Column({ type: 'varchar' })
  youtube: string;

  @Column({ type: 'varchar', enum: ['bcc', 'ecomp'] })
  course: CourseEnum;
}

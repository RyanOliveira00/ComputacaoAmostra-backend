import { CourseEnum, TProject, TUser, TVote, User, Vote } from '@app/modules';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  total_votes: number;

  @Column({ default: 0, insert: false })
  unique_votes: number;

  @Column({ default: true })
  status: boolean;

  @Column({ type: 'varchar' })
  github: string;

  @Column({ type: 'varchar' })
  youtube: string;

  @Column({ type: 'varchar', enum: ['bcc', 'ecomp'] })
  course: CourseEnum;
}

import { Vote } from '../../votes/entities/vote.entity';
import { TVote } from '../../votes/types';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseEnum, TProject } from '../types';

@Entity({ name: 'projects' })
export class Project implements TProject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

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

  @Column({ type: 'json' })
  links: { 
    github: string;
    youtube: {
      en: string;
      pt: string;
    };
    banner?: string;
  };
  @Column({ type: 'varchar', enum: ['bcc', 'ecomp'] })
  course: CourseEnum;
}
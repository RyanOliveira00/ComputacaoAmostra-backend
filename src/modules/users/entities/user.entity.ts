import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { TUser } from '../types';

@Entity({ name: 'users' })
export class User implements TUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ default: 0, insert: false })
  vote_count: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}

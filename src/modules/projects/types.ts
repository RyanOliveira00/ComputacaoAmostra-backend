import { TVote } from '../votes/types';

export type TProject = {
  id: string;
  name: string;
  team: string[];
  description: string;
  votes: TVote[] | TVote['id'][];
  totalVotes: number;
  uniqueVotes: number;
  status: boolean;
  links: {
    github: string;
    youtube: {
      en: string;
      pt: string;
    }
    banner?: string;
  }
  course: CourseEnum;
};

export enum CourseEnum {
  BCC = 'bcc',
  ECOMP = 'ecomp',
}

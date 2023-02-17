import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../projects/entities/project.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CalculateVotesService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}

  async addVotesUser(user_id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id: user_id,
      },
    });
    if (!user)
      throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
    user.vote_count += 1;
    await this.usersRepository.save(user);
    return;
  }
  async addVotesProject(project_id: string, unique: boolean) {
    const project = await this.projectsRepository.findOne({
      where: {
        id: project_id,
      },
    });
    if (!project)
      throw new HttpException('project not found.', HttpStatus.BAD_REQUEST);
    if (unique) {
      project.unique_votes += 1;
    }
    project.total_votes += 1;
    await this.projectsRepository.save(project);
    return;
  }
}

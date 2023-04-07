import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from 'src/modules/projects/entities/project.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class CalculateVotesService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}

  async addVotesUser(userId: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user)
      throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
    user.voteCount += 1;
    await this.usersRepository.save(user);
    return;
  }
  async addVotesProject(projectId: string, unique: boolean) {
    const project = await this.projectsRepository.findOne({
      where: {
        id: projectId,
      },
    });
    if (!project)
      throw new HttpException('project not found.', HttpStatus.BAD_REQUEST);
    if (unique) {
      project.uniqueVotes += 1;
    }
    project.totalVotes += 1;
    await this.projectsRepository.save(project);
    return;
  }
}

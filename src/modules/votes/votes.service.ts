import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CalculateVotesService } from './calculate-votes.service';
import { Repository } from 'typeorm';
import { CreateVoteDto } from './dto/create-vote.dto';
import { Vote } from './entities/vote.entity';
import { Project } from '../projects/entities/project.entity';
import { TVote } from './types';
import { TUser } from '../users/types';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private readonly votesRepository: Repository<Vote>,
    private readonly calculateVotesService: CalculateVotesService,
  ) {}

  async create(createVoteDto: CreateVoteDto) {
    const vote = this.votesRepository.create(createVoteDto);
    const userVotes = await this.votesRepository.find({
      relations: ['userId'],
      where: {
        userId: {
          id: createVoteDto.userId
        }
      }
    });
    await this.calculateVotesService.addVotesProject(
      createVoteDto.projectId,
      userVotes.length === 0,
    );
    await this.calculateVotesService.addVotesUser(createVoteDto.userId);
    await this.votesRepository.save(vote);

    return vote;
  }

  async findAll() {
    const votes = await this.votesRepository.find({
      relations: ['projectId', 'userId'],
    });
    return votes;
  }

  async findByProject(projectId: string) {
    const votes = await this.votesRepository.findOne({
      where: { projectId: projectId },
      relations: ['projectId', 'userId'],
    });
    return votes;
  }
}

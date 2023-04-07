import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CalculateVotesService } from 'src/modules/votes/calculate-votes.service';
import { Repository } from 'typeorm';
import { CreateVoteDto } from 'src/modules/votes/dto/create-vote.dto';
import { Vote } from 'src/modules/votes/entities/vote.entity';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private readonly votesRepository: Repository<Vote>,
    private readonly calculateVotesService: CalculateVotesService,
  ) {}

  async create(createVoteDto: CreateVoteDto) {
    const vote = this.votesRepository.create(createVoteDto);
    const votes = await this.votesRepository.find();
    const userVotes = votes.filter(
      (vote) => vote.userId === createVoteDto.userId.toString(),
    );
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

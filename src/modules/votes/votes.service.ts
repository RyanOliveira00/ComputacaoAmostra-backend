import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVoteDto } from './dto/create-vote.dto';
import { Vote } from './entities/vote.entity';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private readonly votesRepository: Repository<Vote>,
  ) {}

  async create(createVoteDto: CreateVoteDto) {
    const vote = this.votesRepository.create(createVoteDto);
    await this.votesRepository.save(vote);
  }

  async findAll() {
    const votes = await this.votesRepository.find({
      relations: ['project_id', 'user_id'],
    });
    return votes;
  }

  async findByProject(project_id: string) {
    const votes = await this.votesRepository.findOne({
      where: { project_id },
      relations: ['project_id', 'user_id'],
    });
    return votes;
  }
}

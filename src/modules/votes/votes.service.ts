import { TokenException } from '@app/common';
import { configurationService } from '@app/config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TProject } from '../projects';
import { CreateVoteDto } from './dto/create-vote.dto';
import { Vote } from './entities/vote.entity';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private readonly votesRepository: Repository<Vote>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createVoteDto: CreateVoteDto) {
    const vote = this.votesRepository.create(createVoteDto);
    await this.votesRepository.save(vote);
  }

  async findAll(filter?: TProject['name']) {
    const votes = await this.votesRepository.find({
      relations: ['project_id'],
    });
    if (!filter) return votes;
    return votes.filter(({ project_id }) =>
      (project_id as TProject).name.includes(filter),
    );
  }

  async vote(createVoteDto: CreateVoteDto, session: string) {
    try {
      await this.jwtService.verify(session, {
        secret: configurationService.getValue('JWT_SECRET'),
      });
      return await this.create(createVoteDto);
    } catch (error) {
      throw new TokenException();
    }
  }
}

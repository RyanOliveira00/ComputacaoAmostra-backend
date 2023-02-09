import { Injectable } from '@nestjs/common';
import { TProject } from '../projects';
import { CreateVoteDto } from './dto/create-vote.dto';

@Injectable()
export class VotesService {
  create(createVoteDto: CreateVoteDto) {
    return 'This action adds a new vote';
  }

  findAll(filter: TProject['name']) {
    return `This action returns all votes`;
  }

  remove(id: number) {
    return `This action removes a #${id} vote`;
  }
}

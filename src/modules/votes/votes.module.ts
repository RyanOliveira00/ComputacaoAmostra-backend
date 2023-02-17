import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../projects/entities/project.entity';
import { User } from '../users/entities/user.entity';
import { CalculateVotesService } from './calculate-votes.service';
import { Vote } from './entities/vote.entity';
import { VotesService } from './votes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vote, User, Project])],
  providers: [VotesService, CalculateVotesService],
  exports: [VotesService],
})
export class VotesModule {}

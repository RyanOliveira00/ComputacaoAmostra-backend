import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/modules/projects/entities/project.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { CalculateVotesService } from './calculate-votes.service';
import { Vote } from 'src/modules/votes/entities/vote.entity';
import { VotesService } from 'src/modules/votes/votes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vote, User, Project])],
  providers: [VotesService, CalculateVotesService],
  exports: [VotesService],
})
export class VotesModule {}

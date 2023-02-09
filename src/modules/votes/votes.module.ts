import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { VotesService } from './votes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vote])],
  controllers: [],
  providers: [VotesService],
})
export class VotesModule {}

import { Test } from '@nestjs/testing';
import { VotesService } from './votes.service';
import { CalculateVotesService } from './calculate-votes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import {
  mockVotes,
  mockVotesRepository,
} from '../../../test/utils/mocks/votes/';
import { Project } from '../projects/entities/project.entity';
import {
  mockProjects,
  mockProjectsRepository,
} from '../../../test/utils/mocks/projects';
import { User } from '../users/entities/user.entity';
import {
  mockUsers,
  mockUsersRepository,
} from '../../../test/utils/mocks/users';
import { HttpException } from '@nestjs/common';

describe('Tests: VotesService', () => {
  let votesService: VotesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CalculateVotesService,
        VotesService,
        {
          provide: getRepositoryToken(Vote),
          useValue: mockVotesRepository,
        },
        {
          provide: getRepositoryToken(Project),
          useValue: mockProjectsRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    votesService = moduleRef.get<VotesService>(VotesService);
  });

  it('should be defined', () => {
    expect(votesService).toBeDefined();
  });

  it('should be able to create a vote and return it', async () => {
    expect(
      await votesService.create({
        projectId: mockProjects[0].id,
        userId: mockUsers[1].id,
      }),
    ).toEqual({
      projectId: mockProjects[0].id,
      userId: mockUsers[1].id,
    });
  });

  it('should not be able to create a vote without project id', async () => {
    try {
      //@ts-expect-error
      await votesService.create({
        userId: mockUsers[1].id,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  });
  it('should not be able to create a vote without user id', async () => {
    try {
      //@ts-expect-error
      await votesService.create({
        projectId: mockProjects[1].id,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });

  it('should be able to find all votes', async () => {
    expect(await votesService.findAll()).toEqual(mockVotes);
  });

  it('should be able to find all votes of a project', async () => {
    expect(await votesService.findByProject(mockProjects[2].id)).toEqual(
      mockVotes[3],
    );
  });
});

import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HttpModule } from '@nestjs/axios';
import { mockUsers } from '../../../test/utils/mocks/users';
import { mockUsersRepository } from '../../../test/utils/mocks/users.repository';

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ], // Add
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should create a new user record and return it', async () => {
    expect(await usersService.create(mockUsers[0])).toEqual({
      user: mockUsers[0],
    });
  });

  it('should find one user and return it', async () => {
    expect(
      await usersService.findOne({
        id: mockUsers[1].id,
      }),
    ).toEqual(mockUsers[1]);
  });

  it('should find all users and return it', async () => {
    expect(await usersService.findAll()).toEqual(mockUsers);
  });
});

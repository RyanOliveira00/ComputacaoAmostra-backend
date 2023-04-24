import { mockUsers } from './users';

export const mockUsersRepository = {
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest.fn().mockImplementation((user) => Promise.resolve({ user })),
  findOne: jest
    .fn()
    .mockImplementation((query) =>
      Promise.resolve(mockUsers.find((user) => query.where.id === user.id)),
    ),
  find: jest.fn().mockImplementation(() => Promise.resolve(mockUsers)),
};

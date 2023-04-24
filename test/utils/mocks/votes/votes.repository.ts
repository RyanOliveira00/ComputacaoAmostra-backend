import { mockVotes } from "./votes";

export const mockVotesRepository = {
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest.fn().mockImplementation((vote) => Promise.resolve({ ...vote, id: Date.now() })),
  findOne: jest
    .fn()
    .mockImplementation((query) =>
      Promise.resolve(mockVotes.find((vote) => query.where.projectId === vote.projectId || query.where.userId === vote.userId)),
    ),
  find: jest.fn().mockImplementation(() => Promise.resolve(mockVotes)),
};

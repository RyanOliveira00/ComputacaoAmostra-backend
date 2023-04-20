import { mockProjects } from './projects';

export const mockProjectsRepository = {
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest.fn().mockImplementation((project) => Promise.resolve({ project })),
  findOne: jest
    .fn()
    .mockImplementation((query) =>
      Promise.resolve(
        mockProjects.find(
          (project) => query.where.id === project.id && project.status === query.where.status),
      ),
    ),
  find: jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve(mockProjects.filter(project => project.status)),
    ),
};

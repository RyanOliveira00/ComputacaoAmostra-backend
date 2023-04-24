import { Test } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { mockProjectsRepository } from '../../../test/utils/mocks/projects/projects.repository';
import { mockProjects } from '../../../test/utils/mocks/projects';
import { CreateProjectDto } from './dto/create-project.dto';

describe('Unit Tests: ProjectsService', () => {
  let projectsService: ProjectsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: getRepositoryToken(Project),
          useValue: mockProjectsRepository,
        },
      ], // Add
    }).compile();

    projectsService = moduleRef.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(projectsService).toBeDefined();
  });

  it('should create a new project and return it', async () => {
    expect(
      await projectsService.create(
        mockProjects[0] as unknown as CreateProjectDto,
      ),
    ).toEqual(expect.objectContaining(mockProjects[0]));
  });

  it('should change the status of a project', async () => {
    expect(await projectsService.changeStatus(mockProjects[0].id)).toEqual(expect.objectContaining({
      status: false
    }));
  });

  it('should find one project and return it', async () => {
    expect(await projectsService.findOne(mockProjects[1].id)).toEqual(mockProjects[1]);
  });

  it('should find all BCC projects where status is true', async () => {
    expect(await projectsService.findAll('bcc')).toEqual(expect.arrayContaining([mockProjects[1]]));
  });

  it('should find all ECOMP projects where status is true', async () => {
    expect(await projectsService.findAll('ecomp')).toEqual(expect.arrayContaining([mockProjects[3]]));
  });
});

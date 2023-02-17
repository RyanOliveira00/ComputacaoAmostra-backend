import { Injectable } from '@nestjs/common';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class AdminService {
  constructor(private readonly projectService: ProjectsService) {}
  async downloadExcel(projectId?: string) {
    return 'This returns a downloadabl excel file';
  }

  async getVotes(filter: string, projectId?: string) {
    if (projectId) {
      const project = await this.projectService.findOne(projectId);
      return {
        id: project.id,
        name: project.name,
        totalVotes: project.totalVotes,
        uniqueVotes: project.uniqueVotes,
        votes: project.votes,
      };
    } else {
      const projects = await this.projectService.findAll(filter);
      const votes = projects.map((project) => {
        return {
          id: project.id,
          name: project.name,
          totalVotes: project.totalVotes,
          uniqueVotes: project.uniqueVotes,
          votes: project.votes,
        };
      });
      return votes;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class AdminService {
  constructor(private readonly projectService: ProjectsService) {}
  async downloadExcel(projectId?: string) {
    return 'This returns a downloadabl excel file';
  }

  async getVotes(projectId?: string) {
    if (projectId) {
      const project = await this.projectService.findOne(projectId);
      return {
        name: project.name,
        total_votes: project.total_votes,
        unique_votes: project.unique_votes,
        votes: project.votes,
      };
    } else {
      const projects = await this.projectService.findAll();
      const votes = projects.map((project) => {
        return {
          name: project.name,
          total_votes: project.total_votes,
          unique_votes: project.unique_votes,
          votes: project.votes,
        };
      });
      return votes;
    }
  }
}

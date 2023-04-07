import { Injectable } from '@nestjs/common';
import { ExceljsService } from '../../services/exceljs/exceljs.service';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly projectService: ProjectsService,
    private readonly excelService: ExceljsService,
  ) {}
  async downloadExcel({
    projectId,
    filter,
  }: {
    projectId: string;
    filter: string;
  }) {
    if (projectId) {
      const project = await this.projectService.findOne(projectId);
      return this.excelService.fillProjectSheet(project);
    } else {
      const projects = await this.projectService.findAll(filter);
      return this.excelService.fillResultSheet(projects);
    }
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

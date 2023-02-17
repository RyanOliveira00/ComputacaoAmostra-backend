import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = this.projectRepository.create(createProjectDto);
    await this.projectRepository.save(project);

    return project;
  }

  async findAll(filter: string) {
    const projects = await this.projectRepository.find({
      where: { status: true },
      relations: ['votes'],
    });
    if (filter === 'all') return projects;
    return projects.filter((projects) => projects.course === filter);
  }

  async findOne(id: string) {
    const projects = await this.projectRepository.findOne({
      where: { id, status: true },
      relations: ['votes', 'votes.userId'],
    });
    return projects;
  }

  async changeStatus(id: string) {
    const project = await this.findOne(id);
    project.status = !project.status;
    await this.projectRepository.save(project);

    return project;
  }

  async save(project: Project) {
    return await this.projectRepository.save(project);
  }
}

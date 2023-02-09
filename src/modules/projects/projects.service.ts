import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { TProject } from './types';

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

  findAll(filter: TProject['course']) {
    return `This action returns all projects`;
  }

  findOne(id: string) {
    return `This action returns a #${id} project`;
  }

  changeStatus(id: string) {
    return `This action removes a #${id} project`;
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    try {
      const project = this.projectRepository.create(createProjectDto);
      await this.projectRepository.save(project);

      return project;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(filter: string) {
    try {
      const projects = await this.projectRepository.find({
        where: { status: true },
        relations: ['votes'],
      });
      return filter === 'all' ? projects : projects.filter((projects) => projects.course === filter);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(name: string) {
    const projects = await this.projectRepository.find({
      where: { status: true },
      relations: ['votes', 'votes.userId'],
    });
    return projects.find(project => 
      project.name
        .normalize("NFD")
        .replace(/[^a-zA-Z\s]/g, "")
        .replace(/\s+/g, "-")
        .toLowerCase() === name
      );
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

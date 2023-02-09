import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { TProject } from './types';

@Injectable()
export class ProjectsService {
  create(createProjectDto: CreateProjectDto) {
    return 'This action adds a new project';
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

import { AuthGuard, SessionGuard } from '@app/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service';
import { TProject } from './types';

@Controller('projects')
@UseGuards(SessionGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(new AuthGuard('DEV'))
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    try {
      return this.projectsService.create(createProjectDto);
    } catch (error) {
      return { error };
    }
  }

  @UseGuards(new AuthGuard('CLIENT'))
  @Get()
  findAll(@Query('filter') filterType: TProject['course']) {
    try {
      return this.projectsService.findAll(filterType);
    } catch (error) {
      return { error };
    }
  }

  @UseGuards(new AuthGuard('CLIENT'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.projectsService.findOne(id);
    } catch (error) {
      return { error };
    }
  }

  @UseGuards(new AuthGuard('DEV'))
  @Delete('/status/:id')
  changeStatus(@Param('id') id: string) {
    try {
      return this.projectsService.changeStatus(id);
    } catch (error) {
      return { error };
    }
  }
}

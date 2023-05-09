import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../common/decorators/guards/auth.decorator';
import { SessionGuard } from '../../common/decorators/guards/session.decorator';
import { ParseFilterPipe } from '../../common/pipes/parse-filter.pipe';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
@ApiTags('Project Routes')
@ApiHeader({ required: true, name: 'api' })
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
  async findAll(@Query('filter', ParseFilterPipe) filterType: string) {
    try {
      const projects = await this.projectsService.findAll(filterType);
      projects.forEach(project => {
        delete project.totalVotes
        delete project.uniqueVotes
      })
      return projects
    } catch (error) {
      return { error };
    }
  }

  @UseGuards(new AuthGuard('CLIENT'))
  @Get(':name')
  async findOne(@Param('name') name: string) {
    try {
      const project = await this.projectsService.findOne(name);
      delete project.totalVotes
      delete project.uniqueVotes

      return project
    } catch (error) {
      return { error };
    }
  }

  @UseGuards(new AuthGuard('DEV'))
  @UseGuards(SessionGuard)
  @Delete('/status/:id')
  changeStatus(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.projectsService.changeStatus(id);
    } catch (error) {
      return { error };
    }
  }
}

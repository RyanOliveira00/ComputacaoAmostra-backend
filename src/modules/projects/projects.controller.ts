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
    return this.projectsService.create(createProjectDto);
  }

  @UseGuards(new AuthGuard('CLIENT'))
  @Get()
  findAll(@Query('filter') filterType: TProject['course']) {
    return this.projectsService.findAll(filterType);
  }

  @UseGuards(new AuthGuard('CLIENT'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @UseGuards(new AuthGuard('DEV'))
  @Delete('/status/:id')
  changeStatus(@Param('id') id: string) {
    return this.projectsService.changeStatus(id);
  }
}

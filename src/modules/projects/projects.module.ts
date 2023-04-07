import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/modules/projects/entities/project.entity';
import { ProjectsController } from 'src/modules/projects/projects.controller';
import { ProjectsService } from 'src/modules/projects/projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}

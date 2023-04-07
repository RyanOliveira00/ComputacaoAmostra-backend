import { Module } from '@nestjs/common';
import { ExceljsService } from '../../services/exceljs/exceljs.service';
import { ProjectsModule } from '..//projects/projects.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [ProjectsModule],
  controllers: [AdminController],
  providers: [AdminService, ExceljsService],
})
export class AdminModule {}

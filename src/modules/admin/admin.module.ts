import { Module } from '@nestjs/common';
import { ExceljsService } from 'src/services/exceljs/exceljs.service';
import { ProjectsModule } from 'src/modules/projects/projects.module';
import { AdminController } from 'src/modules/admin/admin.controller';
import { AdminService } from 'src/modules/admin/admin.service';

@Module({
  imports: [ProjectsModule],
  controllers: [AdminController],
  providers: [AdminService, ExceljsService],
})
export class AdminModule {}

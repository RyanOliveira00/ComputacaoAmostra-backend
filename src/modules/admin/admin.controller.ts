import { AuthGuard } from '@app/common';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';

@UseGuards(new AuthGuard('ADMIN'))
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/download')
  async downloadExcel() {
    return this.adminService.downloadExcel();
  }

  @Get('/')
  async getAllVotes() {
    return this.adminService.getVotes();
  }

  @Get('/download/:id')
  async downloadExcelByProject(@Param('id') projectId: string) {
    return this.adminService.downloadExcel(projectId);
  }

  @Get('/:id')
  async getVotesByProject(@Param('id') projectId: string) {
    return this.adminService.getVotes(projectId);
  }
}

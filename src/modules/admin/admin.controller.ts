import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/decorators/guards/auth.decorator';
import { SessionGuard } from '../../common/decorators/guards/session.decorator';
import { AdminService } from './admin.service';

@UseGuards(new AuthGuard('ADMIN'), SessionGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/download')
  async downloadExcel() {
    return this.adminService.downloadExcel();
  }

  @Get('/')
  async getAllVotes(@Query('filter') filter: string) {
    return this.adminService.getVotes(filter);
  }

  @Get('/download/:id')
  async downloadExcelByProject(@Param('id', ParseUUIDPipe) projectId: string) {
    return this.adminService.downloadExcel(projectId);
  }

  @Get('/:id')
  async getVotesByProject(@Param('id', ParseUUIDPipe) projectId: string) {
    return this.adminService.getVotes('all', projectId);
  }
}

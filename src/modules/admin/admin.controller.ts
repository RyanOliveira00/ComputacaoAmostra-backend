import {
  Controller,
  Get,
  Header,
  Param,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/decorators/guards/auth.decorator';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { SessionGuard } from '../../common/decorators/guards/session.decorator';
import { AdminService } from './admin.service';

@UseGuards(new AuthGuard('ADMIN'), SessionGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/download')
  @Header('Content-Type', 'text/xlsx')
  async downloadExcel(
    @Query('filter', ParseFilterPipe) filter: string,
    @Query('projectId', ParseUUIDPipe) projectId: string,
  ) {
    return this.adminService.downloadExcel({ projectId, filter });
  }

  @Get('/')
  async getAllVotes(@Query('filter', ParseFilterPipe) filter: string) {
    return this.adminService.getVotes(filter);
  }

  @Get('/:id')
  async getVotesByProject(@Param('id', ParseUUIDPipe) projectId: string) {
    return this.adminService.getVotes('all', projectId);
  }
}

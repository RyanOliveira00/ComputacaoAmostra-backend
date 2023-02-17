import {
  Controller,
  Get,
  Header,
  Param,
  ParseUUIDPipe,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from 'src/common/decorators/guards/auth.decorator';
import { SessionGuard } from 'src/common/decorators/guards/session.decorator';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { AdminService } from './admin.service';

@UseGuards(new AuthGuard('ADMIN'), SessionGuard)
@Controller('admin')
@ApiTags('Admin Routes')
@ApiHeader({ required: true, name: 'api' })
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/download')
  @Header('Content-Type', 'text/xlsx')
  async downloadExcel(
    @Query('filter', ParseFilterPipe) filter: string,
    @Query('projectId') projectId: string,
    @Res() response: Response,
  ) {
    return response.download(
      (await this.adminService.downloadExcel({ projectId, filter })) as any,
    );
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

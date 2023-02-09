import { AuthGuard, GetInCookies } from '@app/common';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('validate_captcha')
  findOne(@Body() body: string) {
    return this.usersService.validateCaptcha(body);
  }

  @Get('set')
  aaa(@Res({ passthrough: true }) res: Response) {
    res.cookie('userId', 'salvee');
    return 'ok';
  }

  @Post('vote')
  @UseGuards(new AuthGuard('CLIENT'))
  async vote(
    @Query('projectId') projectId: string,
    @GetInCookies('userId') userId: string,
  ) {
    return await this.usersService.vote(projectId, userId);
  }
}

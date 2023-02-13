import {
  AuthGuard,
  GetInCookies,
  GetPropInSession,
  Public,
  SessionGuard,
} from '@app/common';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../auth';
import { VotesService } from '../votes';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(new AuthGuard('CLIENT'), SessionGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly votesService: VotesService,
    private readonly authService: AuthService,
  ) {}

  @Get('validate_captcha')
  validateCaptcha(@Body() body: string) {
    return this.usersService.validateCaptcha(body);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Public()
  @Put('generate_session')
  async generateSession(
    @GetInCookies('userId') userId: string,
    @Query('email') email: string,
    @Query('name') name: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.authService.generateSession({
      id: userId,
      email,
      name,
    });
    response.cookie('session_token', token);

    return { status: 'Generated' };
  }

  @Post('vote')
  async vote(
    @Query('projectId') projectId: string,
    @GetPropInSession('id') userId: string,
  ) {
    return await this.votesService.create({
      project_id: projectId,
      user_id: userId,
    });
  }
}

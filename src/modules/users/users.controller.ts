import {
  Body,
  Controller,
  Get,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from 'src/common/decorators/guards/auth.decorator';
import { SessionGuard } from 'src/common/decorators/guards/session.decorator';
import { Public } from 'src/common/decorators/metadata/public.decorator';
import { GetPropInSession } from 'src/common/params/get-prop-in-session';
import { ParseEmailPipe } from '../../common/pipes/parse-email.pipe';
import { AuthService } from '../auth/auth.service';
import { VotesService } from '../votes/votes.service';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(new AuthGuard('CLIENT'), SessionGuard)
@ApiTags('User Routes')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly votesService: VotesService,
    private readonly authService: AuthService,
  ) {}

  @Get('validate_captcha')
  @ApiCookieAuth()
  @ApiHeader({ required: true, name: 'api' })
  validateCaptcha(@Body() body: string) {
    return this.usersService.validateCaptcha(body);
  }

  @Get('/leaderboard')
  @ApiCookieAuth()
  @ApiHeader({ required: true, name: 'api' })
  getLeaderboard() {
    return this.usersService.findAll();
  }

  @Public()
  @Put('generate_session')
  @ApiHeader({ required: true, name: 'api' })
  async generateSession(
    @Query('email', ParseEmailPipe) email: string,
    @Query('name') name: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.authService.generateSession({
      email,
      name,
    });
    response.cookie('session_token', token);

    return { status: 'Generated' };
  }

  @Post('vote')
  @ApiCookieAuth()
  @ApiHeader({ required: true, name: 'api' })
  async vote(
    @Query('projectId', ParseUUIDPipe) projectId: string,
    @GetPropInSession('sub', ParseUUIDPipe) userId: string,
  ) {
    return await this.votesService.create({
      projectId,
      userId,
    });
  }
}

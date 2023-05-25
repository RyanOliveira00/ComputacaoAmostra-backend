import {
  Body,
  Controller,
  Get,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCookieAuth,
  ApiExtraModels,
  ApiHeader,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from '../../common/decorators/guards/auth.decorator';
import { SessionGuard } from '../../common/decorators/guards/session.decorator';
import { Public } from '../../common/decorators/metadata/public.decorator';
import { GetPropInSession } from '../../common/params/get-prop-in-session';
import { AuthService } from '../auth/auth.service';
import { CreateVoteDto } from '../votes/dto/create-vote.dto';
import { VotesService } from '../votes/votes.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { Recaptcha } from '@nestlab/google-recaptcha';

@Controller('users')
@UseGuards(new AuthGuard('CLIENT'), SessionGuard)
@ApiTags('User Routes')
export class UsersController {
  constructor(
    private readonly votesService: VotesService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Put('generate_session')
  @ApiHeader({ required: true, name: 'api' })
  @ApiExtraModels(CreateUserDto)
  async generateSession(
    @Query('email') email: string,
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
  @ApiExtraModels(CreateVoteDto)
  async vote(
    @Query('projectId') projectId: string,
    @GetPropInSession('sub', ParseUUIDPipe) userId: string,
  ) {
    return await this.votesService.create({
      projectId,
      userId,
    });
  }
}

import { AuthGuard, GetInCookies, GetSession } from '@app/common';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Query,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(new AuthGuard('CLIENT'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('validate_captcha')
  findOne(@Body() body: string) {
    return this.usersService.validateCaptcha(body);
  }

  @Put('generate_session')
  async generateSession(
    @GetInCookies('userId') userId: string,
    @Query('email') email: string,
    @Query('name') name: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.usersService.generateSession({
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
    @GetInCookies('token') userId: string,
    @GetSession() session: string,
  ) {
    return await this.usersService.vote(
      {
        project_id: projectId,
        user_id: userId,
      },
      session,
    );
  }
}

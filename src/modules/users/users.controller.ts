import { AuthGuard, GetInCookies } from '@app/common';
import { Body, Controller, Get, Post, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(new AuthGuard('CLIENT'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('validate_captcha')
  findOne(@Body() body: string) {
    return this.usersService.validateCaptcha(body);
  }

  @Post('vote')
  async vote(
    @Query('projectId') projectId: string,
    @GetInCookies('userId') userId: string,
  ) {
    return await this.usersService.vote({
      project_id: projectId,
      user_id: userId,
    });
  }
}

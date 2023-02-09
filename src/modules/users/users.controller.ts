import { AuthGuard } from '@app/common';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

@UseGuards(new AuthGuard('CLIENT'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('validate_captcha')
  findOne(@Body() body: string) {
    return this.usersService.validateCaptcha(body);
  }

  @Post('vote')
  vote(@Body() body: string) {
    return this.usersService.validateCaptcha(body);
  }
}

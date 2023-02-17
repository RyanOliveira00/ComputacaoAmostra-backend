import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './common/decorators/guards/auth.decorator';

@Controller('/health')
export class AppController {
  @Get()
  @UseGuards(new AuthGuard('DEV'))
  healthCheck(): string {
    return 'Ok';
  }
}

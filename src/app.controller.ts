import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@app/common';

@Controller('/health')
export class AppController {
  @Get()
  @UseGuards(new AuthGuard('DEV'))
  healthCheck(): string {
    return 'Ok';
  }
}

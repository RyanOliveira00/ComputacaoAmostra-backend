import { AuthGuard } from '@app/common';
import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller('/health')
export class AppController {
  @Get()
  @UseGuards(new AuthGuard('DEV'))
  healthCheck(): string {
    return 'Ok';
  }
}

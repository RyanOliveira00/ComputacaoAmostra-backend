import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './common/decorators/guards/auth.decorator';

@Controller('/health')
@ApiTags('Health Check')
export class AppController {
  @Get()
  @UseGuards(new AuthGuard('DEV'))
  healthCheck(): string {
    return 'Ok';
  }
}

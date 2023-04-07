import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('/health')
@ApiTags('Health Check')
export class AppController {

  @Get()
  healthCheck(): string {
    return 'Ok';
  }
}

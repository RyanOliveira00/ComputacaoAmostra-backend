import { AuthGuard } from '@app/common';
import { Controller, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';

@UseGuards(new AuthGuard('ADMIN'))
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
}

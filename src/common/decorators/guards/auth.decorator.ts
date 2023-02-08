import { configurationService } from '@app/config';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly keyType: 'DEV' | 'NORMAL' | 'ADMIN') {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    switch (this.keyType) {
      case 'ADMIN':
        return (
          request.headers.email === configurationService.getValue('ADMIN_EMAIL')
        );
      default:
        return (
          request.headers.apiKey ===
          configurationService.getValue(`API_${this.keyType}_KEY`)
        );
    }
  }
}

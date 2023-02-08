import { configurationService } from '@app/config';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly keyType: 'DEV' | 'NORMAL') {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = configurationService.getValue(`API_${this.keyType}_KEY`);

    return apiKey === request.headers.api;
  }
}

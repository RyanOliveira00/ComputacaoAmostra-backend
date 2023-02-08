import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { isEmailAdmin, isApiKeyValid } from '@app/common';
import { RequestWithCustomHeader } from '@app/types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly keyType: 'DEV' | 'NORMAL' | 'ADMIN') {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: RequestWithCustomHeader = context
      .switchToHttp()
      .getRequest();

    if (this.keyType === 'ADMIN') return isEmailAdmin(request.headers.email);

    return isApiKeyValid(request.headers.api, this.keyType);
  }
}

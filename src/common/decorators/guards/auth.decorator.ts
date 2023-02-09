import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { isEmailAdmin, isApiKeyValid } from '@app/common';
import { RequestWithCustomHeader } from '@app/types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly keyType: 'DEV' | 'CLIENT' | 'ADMIN') {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: RequestWithCustomHeader = context
      .switchToHttp()
      .getRequest();

    switch (this.keyType) {
      case 'ADMIN':
        return (
          isApiKeyValid(request.headers.api, 'DEV') ||
          (isEmailAdmin(request.headers.email) &&
            isApiKeyValid(request.headers.api, 'CLIENT'))
        );
      case 'CLIENT':
        return (
          isApiKeyValid(request.headers.api, 'DEV') ||
          isApiKeyValid(request.headers.api, 'CLIENT')
        );
      case 'DEV':
        return isApiKeyValid(request.headers.api, 'DEV');
    }
  }
}

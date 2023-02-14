import { isApiKeyValid, isEmailAdmin } from '@app/common';
import { CustomRequest } from '@app/types';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly keyType: 'DEV' | 'CLIENT' | 'ADMIN') {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: CustomRequest = context.switchToHttp().getRequest();

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

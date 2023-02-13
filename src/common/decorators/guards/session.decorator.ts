import { isApiKeyValid, isEmailAdmin } from '@app/common';
import { RequestWithCustomHeader } from '@app/types';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../modules/auth/auth.service';

@Injectable()
export class SessionGuard {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean | Observable<boolean>> {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;
    const request: RequestWithCustomHeader = context
      .switchToHttp()
      .getRequest();
    return await this.authService.verifySession(
      request.cookies['session_token'],
    );
  }
}

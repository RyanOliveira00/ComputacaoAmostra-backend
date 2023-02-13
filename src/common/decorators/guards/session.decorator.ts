import { isApiKeyValid, isEmailAdmin } from '@app/common';
import { RequestWithCustomHeader } from '@app/types';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../../modules/auth/auth.service';

@Injectable()
export class SessionGuard {
  constructor(private readonly authService: AuthService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean | Observable<boolean>> {
    const request: RequestWithCustomHeader = context
      .switchToHttp()
      .getRequest();
    return await this.authService.verifySession(
      request.cookies['session_token'],
    );
  }
}

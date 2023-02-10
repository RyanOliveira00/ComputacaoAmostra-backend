import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { RequestWithCustomHeader } from '../../@types/index';

export const GetSession = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request: RequestWithCustomHeader = ctx.switchToHttp().getRequest();
    return request.cookies['session_token'];
  },
);

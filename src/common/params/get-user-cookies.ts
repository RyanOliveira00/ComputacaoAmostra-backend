import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { RequestWithCustomHeader } from '../../@types/index';

export const GetUserInCookies = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: RequestWithCustomHeader = ctx.switchToHttp().getRequest();
    return request.headers.cookie;
  },
);

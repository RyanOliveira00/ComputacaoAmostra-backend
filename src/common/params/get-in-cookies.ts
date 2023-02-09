import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { RequestWithCustomHeader } from '../../@types/index';

export const GetInCookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request: RequestWithCustomHeader = ctx.switchToHttp().getRequest();
    return request.cookies[data];
  },
);

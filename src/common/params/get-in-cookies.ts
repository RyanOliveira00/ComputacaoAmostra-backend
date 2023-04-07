import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { CustomRequest } from 'src/@types/index';

export const GetInCookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request: CustomRequest = ctx.switchToHttp().getRequest();
    return request.cookies[data];
  },
);

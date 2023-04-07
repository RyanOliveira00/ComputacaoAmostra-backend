import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { CustomRequest } from '../../@types';
import { Session } from '../../@types';

export const GetPropInSession = createParamDecorator(
  (data: keyof Session, ctx: ExecutionContext) => {
    const request: CustomRequest = ctx.switchToHttp().getRequest();
    return request.user[data];
  },
);

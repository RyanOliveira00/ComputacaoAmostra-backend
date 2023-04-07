import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { CustomRequest } from 'src/@types/index';
import { Session } from 'src/@types/index';

export const GetPropInSession = createParamDecorator(
  (data: keyof Session, ctx: ExecutionContext) => {
    const request: CustomRequest = ctx.switchToHttp().getRequest();
    return request.user[data];
  },
);

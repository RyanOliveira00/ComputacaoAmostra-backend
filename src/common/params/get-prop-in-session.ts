import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import type { CustomRequest } from '../../@types/index';
import { Session } from '../../@types/index';

export const GetPropInSession = createParamDecorator(
  (data: keyof Session, ctx: ExecutionContext) => {
    const request: CustomRequest = ctx.switchToHttp().getRequest();
    return request.user[data];
  },
);

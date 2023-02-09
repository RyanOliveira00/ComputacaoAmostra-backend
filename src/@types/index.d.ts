import { Request } from 'express';
import type { IncomingHttpHeaders } from 'http';

export interface RequestWithCustomHeader extends Request {
  headers: IncomingHttpHeaders & {
    email: string;
    api: string;
  };
}

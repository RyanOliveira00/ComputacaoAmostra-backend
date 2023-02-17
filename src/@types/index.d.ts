import { Request } from 'express';
import type { IncomingHttpHeaders } from 'http';

export interface CustomRequest extends Request {
  headers: IncomingHttpHeaders & {
    email: string;
    api: string;
  };
  user: Session;
}

export type SessionPayload = {
  sub: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
};

export type Session = {
  email: string;
  name: string;
  sub: string;
};

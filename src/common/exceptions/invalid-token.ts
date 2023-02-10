import { HttpException, HttpStatus } from '@nestjs/common';

export class TokenException extends HttpException {
  constructor() {
    super('Session is expired, please log in again.', HttpStatus.FORBIDDEN);
  }
}

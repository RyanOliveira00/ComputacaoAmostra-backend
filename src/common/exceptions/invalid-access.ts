import { HttpException, HttpStatus } from '@nestjs/common';

export class AccessException extends HttpException {
  constructor() {
    super('User cannot access this feature.', HttpStatus.FORBIDDEN);
  }
}

import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseEmailPipe implements PipeTransform {
  transform(value: string, _metadata: ArgumentMetadata) {
    if (new RegExp('.{1,}@[^.]{1,}').test(value))
      throw new BadRequestException();
    return value;
  }
}

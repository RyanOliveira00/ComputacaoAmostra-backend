import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseEmailPipe implements PipeTransform {
  transform(value: string, _metadata: ArgumentMetadata) {
    return new RegExp('.{1,}@[^.]{1,}').test(value);
  }
}

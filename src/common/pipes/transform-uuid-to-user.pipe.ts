import { UsersService } from '@app/modules';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { TUser } from '../../modules/users/types';

@Injectable()
export class TransformUUIDToUserPipe implements PipeTransform {
  constructor(private readonly usersService: UsersService) {}

  transform(data: TUser['id'], _metadata: ArgumentMetadata) {
    return this.usersService.findOne(data);
  }
}

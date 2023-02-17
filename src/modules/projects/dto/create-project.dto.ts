import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';
import { TUser } from 'src/modules/users/types';
import { CourseEnum } from '../types';
export class CreateProjectDto {
  @IsUUID()
  ownerId: string | TUser;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ArrayMaxSize(5)
  @ArrayMinSize(3)
  team: string[];

  @IsUrl()
  github: string;

  @IsUrl()
  youtube: string;

  @IsEnum({ BCC: 'bcc', ECOMP: 'ecomp' })
  course: CourseEnum;
}

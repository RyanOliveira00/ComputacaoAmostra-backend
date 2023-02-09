import { CourseEnum, TUser } from '@app/modules';
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
export class CreateProjectDto {
  @IsUUID()
  owner_id: string | TUser;

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

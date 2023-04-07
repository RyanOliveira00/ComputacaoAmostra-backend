import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
} from 'class-validator';
import { CourseEnum } from 'src/modules/projects/types';
export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsArray()
  @ArrayMaxSize(5)
  @ArrayMinSize(3)
  @ApiProperty()
  team: string[];

  @IsUrl()
  @ApiProperty()
  github: string;

  @IsUrl()
  @ApiProperty()
  youtube: string;

  @IsEnum({ BCC: 'bcc', ECOMP: 'ecomp' })
  @ApiProperty()
  course: CourseEnum;
}

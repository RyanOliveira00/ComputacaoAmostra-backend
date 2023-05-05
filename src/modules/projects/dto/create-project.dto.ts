import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { CourseEnum } from '../types';
import { Type } from 'class-transformer';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsArray()
  @ArrayMaxSize(5)
  @ArrayMinSize(3)
  @ApiProperty()
  team: string[];

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => LinksDto)
  @ApiProperty()
  links: LinksDto;

  @IsEnum({ BCC: 'bcc', ECOMP: 'ecomp' })
  @ApiProperty()
  course: CourseEnum;
}

class LinksDto {
  @IsUrl()
  @ApiProperty()
  github: string;

  @ValidateNested({ each: true })
  @Type(() => MultilanguageVideoDto)
  @ApiProperty()
  youtube: MultilanguageVideoDto;
}

class MultilanguageVideoDto {
  @IsString()
  @IsUrl()
  @ApiProperty()
  en: string;

  @IsString()
  @IsUrl()
  @ApiProperty()
  pt: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateVoteDto {
  @IsUUID()
  @ApiProperty()
  userId: string;
  @IsUUID()
  @ApiProperty()
  projectId: string;
}

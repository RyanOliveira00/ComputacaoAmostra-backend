import { IsUUID } from 'class-validator';

export class CreateVoteDto {
  @IsUUID()
  userId: string;
  @IsUUID()
  projectId: string;
}

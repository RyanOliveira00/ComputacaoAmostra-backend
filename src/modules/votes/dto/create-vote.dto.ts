import { IsUUID } from 'class-validator';

export class CreateVoteDto {
  @IsUUID()
  user_id: string;
  @IsUUID()
  project_id: string;
}

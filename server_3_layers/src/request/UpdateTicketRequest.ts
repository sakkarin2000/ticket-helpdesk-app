import { IsEnum, IsString } from 'class-validator';

enum Status {
  Pending = 'Pending',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Resolved = 'Resolved',
}

export class UpdateTicketRequest {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsString()
  contact_info: string;
  @IsEnum(Status)
  status: Status;
}

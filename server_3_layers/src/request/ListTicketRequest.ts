import { IsEnum, IsNumber, IsOptional } from 'class-validator';
enum Status {
  Pending = 'Pending',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Resolved = 'Resolved',
}

export class ListTicketRequest {
  @IsNumber()
  limit: number;
  @IsNumber()
  offset: number;
  @IsEnum(Status)
  @IsOptional()
  status: Status;
}

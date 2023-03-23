import { IsEnum, IsNumber, IsOptional } from 'class-validator';
export enum Status {
  Pending = 'Pending',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Resolved = 'Resolved',
  Canceled = 'Canceled',
}

export class ListTicketRequest {
  @IsNumber()
  limit: number;
  @IsNumber()
  offset: number;
  @IsEnum(Status)
  @IsOptional()
  status: any;
}

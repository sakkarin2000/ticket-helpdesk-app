import { IsEnum, IsString } from 'class-validator';

enum Status {
  Pending = 'Pending',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Resolved = 'Resolved',
  Canceled = 'Canceled',
}

export const ValidTransitions: {
  [key in Status]: Status[];
} = {
  Pending: ['Pending', 'Accepted', 'Rejected', 'Canceled'] as Status[],
  Canceled: ['Canceled'] as Status[],
  Accepted: ['Accepted', 'Resolved', 'Canceled'] as Status[],
  Rejected: ['Rejected', 'Accepted'] as Status[],
  Resolved: ['Resolved'] as Status[],
};

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

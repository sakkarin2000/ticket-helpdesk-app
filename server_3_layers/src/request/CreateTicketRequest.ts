import { IsString } from 'class-validator';

export class CreateTicketRequest {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsString()
  contact_info: string;
}

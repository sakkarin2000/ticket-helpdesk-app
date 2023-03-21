import { IsNumber, IsString } from 'class-validator';
export class UpdateTicketRequest {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsString()
  contact_info: string;
  @IsString()
  ticket_id: string;
  @IsNumber()
  status: number;
}

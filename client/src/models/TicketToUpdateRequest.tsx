export class TicketToUpdateRequest {
  title: string;
  description: string;
  contact_info: string;
  status: string;

  constructor(
    title: string,
    description: string,
    contact_info: string,
    status: string
  ) {
    this.title = title;
    this.description = description;
    this.contact_info = contact_info;
    this.status = status;
  }
}

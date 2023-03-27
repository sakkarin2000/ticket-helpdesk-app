export class CreateTicketRequest {
  title: string;
  description: string;
  contact_info: string;

  constructor(title: string, description: string, contact_info: string) {
    this.title = title;
    this.description = description;
    this.contact_info = contact_info;
  }
}

export interface Ticket {
  _id: string;
  title: string;
  description: string;
  contact_info: string;
  created_at: string;
  updated_at: string;
  status: number;
}

export interface Ticket_Meta_Data {
  limit: number;
  offset: number;
  count: number;
  total: number;
}

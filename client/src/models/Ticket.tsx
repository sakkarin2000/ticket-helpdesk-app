export interface Ticket {
  ticket_id: string;
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

export const TicketStatus = [
  {
    id: 0,
    status_name_en: "pending",
  },
  {
    id: -1,
    status_name_en: "rejected",
  },
  {
    id: 2,
    status_name_en: "resolved",
  },
  {
    id: 1,
    status_name_en: "accepted",
  },
];

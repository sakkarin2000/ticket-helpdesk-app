export interface Ticket {
  ticket_id: string;
  title: string;
  description: string;
  contact_info: string;
  created_at: string;
  updated_at: string;
  status: number;
}

export interface TicketForSorting {
  ticket_id: string;
  title: string;
  description: string;
  contact_info: string;
  created_at: string;
  updated_at: string;
  status: number;
  [key: string]: any;
}

export interface Ticket_Meta_Data {
  limit: number;
  offset: number;
  count: number;
  total: number;
  overall_total: number;
}

export const TicketStatus = [
  {
    id: 0,
    status_name_en: "Pending",
  },
  {
    id: -1,
    status_name_en: "Rejected",
  },
  {
    id: 2,
    status_name_en: "Resolved",
  },
  {
    id: 1,
    status_name_en: "Accepted",
  },
];

export const TicketStatusForFilter = [
  {
    id: "any",
    status_name_en: "---------",
  },
  {
    id: "0",
    status_name_en: "Pending",
  },
  {
    id: "1",
    status_name_en: "Accepted",
  },
  {
    id: "-1",
    status_name_en: "Rejected",
  },
  {
    id: "2",
    status_name_en: "Resolved",
  },
];

export const TicketSortingByColumnList = [
  {
    sort_by_column: "updated_at",
  },
  {
    sort_by_column: "status",
  },
];

export interface Ticket {
  [key: string]: string;
  ticket_id: string;
  title: string;
  description: string;
  contact_info: string;
  created_at: string;
  updated_at: string;
  status: string;
}

export interface TicketForSorting {
  ticket_id: string;
  title: string;
  description: string;
  contact_info: string;
  created_at: string;
  updated_at: string;
  status: string;
  [key: string]: any;
}

export interface TicketMetaData {
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
  {
    id: -2,
    status_name_en: "Canceled",
  },
];

export const TicketStatusForFilter = [
  {
    id: "",
    status_name_en: "",
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
  {
    id: "-2",
    status_name_en: "Canceled",
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

import { CreateTicketRequest } from '../request/CreateTicketRequest.js';
import { ListTicketRequest } from '../request/ListTicketRequest.js';
import { UpdateTicketRequest } from '../request/UpdateTicketRequest.js';
import pool from './db.js';

export interface TicketInterface {
  ticket_id: string;
  title: string;
  description: string;
  contact_info: string;
  created_at: string;
  updated_at: string;
  status: number;
  status_name_en: string;
}

export default class TicketRepository {
  public async list(listTicketRequest: ListTicketRequest): Promise<TicketInterface[]> {
    const query =
      'select ticket.id as ticket_id, title, description, contact_info, created_at, updated_at, status from ticket  order by updated_at desc LIMIT $1 OFFSET $2';
    const result = await pool.query(query, [listTicketRequest.limit, listTicketRequest.offset]);
    const tickets = result.rows;
    return tickets;
  }
  public async listWithStatusFilter(listTicketRequest: ListTicketRequest): Promise<TicketInterface[]> {
    const query =
      'select ticket.id as ticket_id, title, description, contact_info, created_at, updated_at, status from ticket where status = $1 order by updated_at desc  LIMIT $2 OFFSET $3';
    const result = await pool.query(query, [
      listTicketRequest.status,
      listTicketRequest.limit,
      listTicketRequest.offset,
    ]);
    const tickets = result.rows;
    return tickets;
  }

  public async create(ticket: CreateTicketRequest): Promise<void> {
    const query = 'insert into ticket (title, description, contact_info) values ($1, $2, $3);';
    await pool.query(query, [ticket.title, ticket.description, ticket.contact_info]);
  }

  public async update(ticket_id: string, ticket: UpdateTicketRequest): Promise<void> {
    const query =
      'update ticket set title = $1 , description = $2 , contact_info = $3, status = $4, updated_at = current_timestamp where id = $5;';
    await pool.query(query, [ticket.title, ticket.description, ticket.contact_info, ticket.status, ticket_id]);
  }

  public async totalTicket(): Promise<number> {
    const query = 'select count(*)::integer from ticket';
    const result = await pool.query(query);
    const total_ticket = result.rows[0].count;
    return total_ticket;
  }

  public async totalTicketWithStatusFilter(status: number): Promise<number> {
    const query = 'select count(*)::integer from ticket where status = $1';
    const result = await pool.query(query, [status]);
    const total_ticket = result.rows[0].count;
    return total_ticket;
  }
}

import { ListTicketRequest } from 'src/request/ListTicketRequest';
import { TicketEntity, TicketRepository } from '../repository/TicketRepository';
import { CreateTicketRequest } from '../request/CreateTicketRequest';
import { UpdateTicketRequest } from '../request/UpdateTicketRequest';
export default class TicketService {
  constructor(private ticketRepo: TicketRepository) {}

  async list(listTicketRequest: ListTicketRequest) {
    let tickets: TicketEntity[] = [];
    const hasStatusFilter = listTicketRequest.status == undefined ? false : true;
    let total = 0;

    if (hasStatusFilter) {
      tickets = await this.ticketRepo.listWithStatusFilter(listTicketRequest);
      total = await this.totalTicketWithStatusFilter(listTicketRequest.status);
    } else {
      tickets = await this.ticketRepo.list(listTicketRequest);
      total = await this.totalTicket();
    }
    const count = tickets.length;
    const overall_total = await this.totalTicket();

    const metadata = {
      limit: listTicketRequest.limit,
      offset: listTicketRequest.offset,
      count,
      total: total,
      overall_total: overall_total,
    };

    const responseData = {
      data: tickets,
      meta: metadata,
      message: 'Get all tickets Success',
    };
    return responseData;
  }
  async create(ticketToCreate: CreateTicketRequest) {
    await this.ticketRepo.create(ticketToCreate);
  }

  async update(ticket_id: string, ticketToUpdate: UpdateTicketRequest) {
    const current_status = await this.ticketRepo.getCurrentStatus(ticket_id);
    const validTransitions: any = {
      Pending: ['Accepted', 'Rejected', 'Canceled'],
      Canceled: [],
      Accepted: ['Resolved', 'Canceled'],
      Rejected: ['Accepted'],
      Resolved: [],
    };

    if (!validTransitions[current_status]?.includes(ticketToUpdate.status)) {
      return { success: false, message: 'Invalid status' };
    }
    const result = await this.ticketRepo.update(ticket_id, ticketToUpdate);
    if (result.rowCount == 0) {
      return { success: false, message: 'Ticket Not Found' };
    }
    return { success: true, message: 'Update Ticket Success' };
  }

  async totalTicket() {
    const total_ticket = await this.ticketRepo.totalTicket();
    return total_ticket;
  }

  async totalTicketWithStatusFilter(status: string) {
    const total_ticket = await this.ticketRepo.totalTicketWithStatusFilter(status);
    return total_ticket;
  }
}

import { ListTicketRequest } from 'src/request/ListTicketRequest.js';
import TicketRepository, { TicketInterface } from '../repository/TicketRepository.js';
import { CreateTicketRequest } from '../request/CreateTicketRequest.js';
import { UpdateTicketRequest } from '../request/UpdateTicketRequest.js';
export default class TicketService {
  ticketRepo = new TicketRepository();

  async list(listTicketRequest: ListTicketRequest) {
    let tickets: TicketInterface[] = [];
    if (listTicketRequest.status == undefined) {
      tickets = await this.ticketRepo.list(listTicketRequest);
    } else {
      tickets = await this.ticketRepo.listWithStatusFilter(listTicketRequest);
    }
    return tickets;
  }
  async create(ticketToCreate: CreateTicketRequest) {
    await this.ticketRepo.create(ticketToCreate);
  }

  async update(ticket_id: string, ticketToUpdate: UpdateTicketRequest) {
    await this.ticketRepo.update(ticket_id, ticketToUpdate);
  }

  async totalTicket() {
    const total_ticket = await this.ticketRepo.totalTicket();
    return total_ticket;
  }

  async totalTicketWithStatusFilter(status: number) {
    const total_ticket = await this.ticketRepo.totalTicketWithStatusFilter(status);
    return total_ticket;
  }
}

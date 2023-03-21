import TicketRepository from '../repository/TicketRepository.js';
export default class TicketService {
  ticketRepo = new TicketRepository();

  async list(limit: number, offset: number) {
    const tickets = await this.ticketRepo.list(limit, offset);
    return tickets;
  }

  async listWithStatusFilter(limit: number, offset: number, status: number) {
    const tickets = await this.ticketRepo.listWithStatusFilter(limit, offset, status);
    return tickets;
  }

  async create(title: string, description: string, contact_info: string) {
    await this.ticketRepo.create(title, description, contact_info);
  }

  async update(title: string, description: string, contact_info: string, ticket_id: string, status: number) {
    await this.ticketRepo.update(title, description, contact_info, ticket_id, status);
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

import { Body, Get, JsonController, Post, Put, QueryParams, Req, Res } from 'routing-controllers';
import { TicketRepository } from '../repository/TicketRepository';
import { CreateTicketRequest } from '../request/CreateTicketRequest';
import { ListTicketRequest } from '../request/ListTicketRequest';
import { UpdateTicketRequest } from '../request/UpdateTicketRequest';
import TicketService from '../services/TicketService';

@JsonController()
export class TicketController {
  tiketRepo: TicketRepository;
  ticketService: TicketService;
  constructor() {
    this.tiketRepo = new TicketRepository();
    this.ticketService = new TicketService(this.tiketRepo);
  }
  @Get('/tickets')
  async listAllTicket(@Req() request: any, @Res() response: any, @QueryParams() query: ListTicketRequest) {
    try {
      const ticketResponse = await this.ticketService.list(query);
      return response.status(200).send(ticketResponse);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error, Can't list ticket");
    }
  }

  @Post('/tickets')
  async createTicket(@Res() response: any, @Body() ticketBody: CreateTicketRequest) {
    try {
      await this.ticketService.create(ticketBody);
      return response.status(201).send('Create ticket success');
    } catch (error) {
      console.error(error);
      response.status(500).send("Error, Can't create ticket");
    }
  }

  @Put('/tickets/:id')
  async updateTicket(@Req() request: any, @Res() response: any, @Body() ticketBody: UpdateTicketRequest) {
    try {
      const ticketId = request.params.id;
      const result = await this.ticketService.update(ticketId, ticketBody);
      if (!result.success) {
        return response.status(400).send(result.message);
      }
      return response.status(201).send(result.message);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error, Can't update ticket");
    }
  }

  @Get('/total-ticket')
  async getTotalTicket(@Req() request: any, @Res() response: any) {
    try {
      const totalTicket = await this.ticketService.totalTicket();
      const responseData = {
        total_ticket: totalTicket,
      };
      return response.status(200).send(responseData);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error, Can't get total number of ticket");
    }
  }
}

import { Body, Get, JsonController, Post, Put, Req, Res } from 'routing-controllers';
import { CreateTicketRequest } from '../request/CreateTicketRequest.js';
import { ListTicketRequest } from '../request/ListTicketRequest.js';
import { UpdateTicketRequest } from '../request/UpdateTicketRequest.js';
import TicketService from '../services/TicketService.js';

@JsonController()
export class TicketController {
  ticketService = new TicketService();
  @Get('/tickets')
  async listAllTicket(@Req() request: any, @Res() response: any) {
    const limit = parseInt(request.query.limit);
    const offset = parseInt(request.query.offset);
    const status = request.query.status;

    const listTicketRequest = new ListTicketRequest();
    listTicketRequest.limit = limit;
    listTicketRequest.offset = offset;
    listTicketRequest.status = status;

    const hasStatusFilter = !isNaN(status);
    let total = 0;
    const ticketData = await this.ticketService.list(listTicketRequest);

    if (hasStatusFilter) {
      total = await this.ticketService.totalTicketWithStatusFilter(status);
    } else {
      total = await this.ticketService.totalTicket();
    }
    const count = ticketData.length;
    const overall_total = await this.ticketService.totalTicket();

    const metadata = {
      limit,
      offset,
      count,
      total: total,
      overall_total: overall_total,
    };

    const responseData = {
      data: ticketData,
      meta: metadata,
      message: 'Get all tickets Success',
    };
    return response.status(200).send(responseData);
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
  // TODO: add id to path to update ticket [Completed]
  async updateTicket(@Req() request: any, @Res() response: any, @Body() ticketBody: UpdateTicketRequest) {
    const ticketId = request.params.id;
    console.log(ticketId);
    await this.ticketService.update(ticketId, ticketBody);
    return response.status(201).send('Update ticket success');
  }

  @Get('/total-ticket')
  async getTotalTicket(@Req() request: any, @Res() response: any) {
    const totalTicket = await this.ticketService.totalTicket();
    const responseData = {
      total_ticket: totalTicket,
    };
    return response.status(200).send(responseData);
  }
}

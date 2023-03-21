import { validate } from 'class-validator';
import { Body, Get, JsonController, Post, Put, Req, Res } from 'routing-controllers';
import { CreateTicketRequest } from '../request/CreateTicketRequest.js';
import { UpdateTicketRequest } from '../request/UpdateTicketRequest.js';
import TicketService from '../services/TicketService.js';

@JsonController()
export class TicketController {
  ticketService = new TicketService();
  @Get('/tickets')
  async listAllTicket(@Req() request: any, @Res() response: any) {
    const limit = request.query.limit ? parseInt(request.query.limit as string) : 10;
    const offset = request.query.offset ? parseInt(request.query.offset as string) : 0;
    const status = parseInt(request.query.status as string, 10);
    const hasFilter = !isNaN(status);
    const ticketData = hasFilter
      ? await this.ticketService.listWithStatusFilter(limit, offset, status)
      : await this.ticketService.list(limit, offset);
    const count = ticketData.length;
    const total = hasFilter
      ? await this.ticketService.totalTicketWithStatusFilter(status)
      : await this.ticketService.totalTicket();
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
      const ticket: CreateTicketRequest = ticketBody;
      validate(ticket).then((errors) => {
        // errors is an array of validation errors
        if (errors.length > 0) {
          console.log('validation failed. errors: ', errors);
        } else {
          console.log('validation succeed');
        }
      });

      await this.ticketService.create(ticket.title, ticket.description, ticket.contact_info);
      return response.status(201).send('Create ticket success');
    } catch (error) {
      console.error(error);
      response.status(500).send("Error, Can't create ticket");
    }
  }

  @Put('/tickets')
  async updateTicket(@Req() request: any, @Res() response: any, @Body() ticketBody: UpdateTicketRequest) {
    const ticket: UpdateTicketRequest = ticketBody;
    validate(ticket).then((errors) => {
      // errors is an array of validation errors
      if (errors.length > 0) {
        console.log('validation failed. errors: ', errors);
      } else {
        console.log('validation succeed');
      }
    });

    await this.ticketService.update(
      ticket.title,
      ticket.description,
      ticket.contact_info,
      ticket.ticket_id,
      ticket.status,
    );
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

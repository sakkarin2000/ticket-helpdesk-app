import pool from '../database/db.js';
import { Request, Response } from 'express';
import queries from '../database/queries.js';

const getTicket = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string, 10);
    const status = parseInt(req.query.status as string, 10);
    const offset = parseInt(req.query.offset as string, 10);

    if (isNaN(limit) || isNaN(offset)) {
      res.status(400).send('Bad Request, Required Limit and Offset');
      return;
    }
    const query = isNaN(status) ? queries.get_ticket : queries.get_ticket_w_status_filter;
    const query_params = isNaN(status) ? [limit, offset] : [status, limit, offset];
    const total_query = isNaN(status) ? queries.get_count_ticket_total : queries.get_count_ticket_w_status_filter_total;
    const total_query_params = isNaN(status) ? [] : [status];

    const result = await pool.query(query, query_params);
    const total_result = await pool.query(total_query, total_query_params);
    const total = total_result.rows[0].count;
    const tickets = result.rows;
    const count = tickets.length;
    const metadata = {
      limit,
      offset,
      count,
      total: total,
    };

    const response = {
      data: tickets,
      meta: metadata,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error, Can't get ticket");
  }
};

const createTicket = async (req: Request, res: Response) => {
  try {
    const { title, description, contact_info } = req.body;
    console.log(req.body);
    if (!title || !description || !contact_info) {
      res.status(400).send('Bad Request, Required Title, Description, Contact Info');
      return;
    }
    const result = await pool.query(queries.create_ticket, [title, description, contact_info]);
    if (result.rowCount === 1) {
      res.status(201).send('Create ticket success');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error, Can't create ticket");
  }
};

const updateTicketInfo = async (req: Request, res: Response) => {
  try {
    const { title, description, contact_info, ticket_id } = req.body;

    if (!ticket_id) {
      res.status(400).send('Bad Request, Required Ticket ID');
      return;
    }
    const is_rejected = await pool.query(queries.check_ticket_is_rejected, [ticket_id]);

    const queryToExecute = is_rejected.rows[0].is_rejected
      ? queries.update_ticket_info_resolve
      : queries.update_ticket_info; // if ticket is rejected, update status to resolved
    const result = await pool.query(queryToExecute, [title, description, contact_info, ticket_id]);
    if (result.rowCount === 1) {
      res.status(201).send('Update ticket info success');
    } else if (result.rowCount === 0) {
      res.status(404).send('Bad Request, Ticket ID not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error, Can't update ticket info");
  }
};

const updateTicketStatus = async (req: Request, res: Response) => {
  try {
    const { status, ticket_id } = req.body;

    if (!ticket_id || !status) {
      res.status(400).send('Bad Request, Required Ticket ID and Status');
      return;
    }
    const result = await pool.query(queries.update_ticket_status, [status, ticket_id]);
    if (result.rowCount === 1) {
      res.status(201).send(`Update ticket ID: ${ticket_id} status to ${status} success`);
    } else if (result.rowCount === 0) {
      res.status(404).send('Bad Request, Ticket ID not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error, Can't update ticket status");
  }
};

const getCountTicket = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(queries.get_count_ticket_total);
    const total = result.rows[0].count;
    res.status(200).send({
      total_ticket: total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error, Can't get ticket");
  }
};
export { getTicket, createTicket, updateTicketInfo, updateTicketStatus, getCountTicket };

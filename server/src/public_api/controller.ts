import { pool } from '../database/db.js';
import { Request, Response } from 'express';
import queries from './queries.js';

const getTicket = async (req: Request, res: Response) => {
  try {
    const limit = req.params.limit;
    const offset = req.params.offset;
    const tickets = await pool.query(queries.get_ticket, [limit, offset]);
    res.status(200).json(tickets.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
//What to do tmr merge these two functions into one and separate by the status param passed in
const getTicketWithStatusFilter = async (req: Request, res: Response) => {
  try {
    const limit = req.params.limit;
    const status = req.params.status;
    const offset = req.params.offset;

    if (!Number.isInteger(limit) || !Number.isInteger(status) || !Number.isInteger(offset)) {
      res.status(400).send('Bad Request');
      return;
    }

    const tickets = await pool.query(queries.get_ticket_w_status_filter, [status, limit, offset]);
    res.status(200).json(tickets.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export { getTicket, getTicketWithStatusFilter };

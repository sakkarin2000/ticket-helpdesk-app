import { Router } from 'express';
import {
  getTicket,
  createTicket,
  updateTicketInfo,
  updateTicketStatus,
  getCountTicket,
  updateTicketInfoAndStatus,
} from '../controller/ticketController.js';

const router = Router();

router.get('/ticket', getTicket).post('/ticket', createTicket).put('/ticket', updateTicketInfoAndStatus);
router.get('/total-ticket', getCountTicket);
router.put('/update-ticket-info', updateTicketInfo);
router.put('/update-ticket-status', updateTicketStatus);

export default router;

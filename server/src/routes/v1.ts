import { Router } from 'express';
import { getTicket, createTicket, updateTicketInfo, updateTicketStatus } from '../controller/ticketController.js';

const router = Router();

router.get('/ticket', getTicket).post('/ticket', createTicket);
router.put('/update-ticket-info', updateTicketInfo);
router.put('/update-ticket-status', updateTicketStatus);

export default router;

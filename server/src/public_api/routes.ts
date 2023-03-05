import { Router } from 'express';
import { getTicket } from './controller.js';

const router = Router();

router.get('/ticket', getTicket);

module.exports = router;

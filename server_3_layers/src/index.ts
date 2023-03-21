// this shim is required
import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { TicketController } from './controllers/TicketController.js';

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
  cors: true,
  controllers: [TicketController], // we specify controllers we want to use
});

// run express application on port 3000
console.log('Server is running on port 5001');
app.listen(5001);

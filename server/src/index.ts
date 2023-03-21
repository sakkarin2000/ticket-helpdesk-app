import cors from 'cors';
import express from 'express';
import v1Routes from './routes/v1.js';
import logResponse from './utils/logResponse.js';
const app = express();
const port = 5001;
const corsOptions = {
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(logResponse);

app.get('/', (req, res) => {
  res.send('Ticket Helpdesk Restful API!');
});

app.use('/api/v1', v1Routes);

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});

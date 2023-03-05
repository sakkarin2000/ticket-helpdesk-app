import express from 'express';
const app = express();
const port = 5001;

app.get('/', (req, res) => {
  res.send('Hello World7!');
});

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});

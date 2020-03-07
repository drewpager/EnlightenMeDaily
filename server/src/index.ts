import express from 'express';
import { quotes } from './quotes';
import bodyParser from 'body-parser';

const app = express();
const port = 9000;

const one: number = 1;
const two: number = 2;

app.get('/', (_req, res) => res.send(`1 + 2 = ${one + two}`));
app.get('/quotes', (_req, res) => res.send(quotes));

app.use(bodyParser.json());

app.post('/delete-quote', (req, res) => {
  const id: string = req.body.id;

  for (let i = 0; i < quotes.length; i++) {
    if (quotes[i].id === id) {
      return res.send(quotes.splice(i, 1)[0]);
    }
  }
  return res.send("Failed to delete quote.");
});

app.listen(port);

console.log(`Express is running on port: ${port}`);
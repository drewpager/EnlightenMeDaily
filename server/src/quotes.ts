// import { ObjectId } from 'mongodb';

interface Quotes {
  id: string;
  quote: string;
  author: string;
  category: string;
  period: number;
  image: string;
}

export const quotes: Quotes[] = [
  {
    id: "001",
    quote: "I think therefore I am",
    author: "René Descartes",
    category: "philosophy",
    period: 1500,
    image: "https://images.unsplash.com/photo-1509029032154-54ba8b3216d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
  },
  {
    id: "002",
    quote: "Slow is smooth and smooth is fast",
    author: "US Military Adage",
    category: "philosophy",
    period: 1900,
    image: "https://images.unsplash.com/photo-1508530786855-dfea35260b8d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" 
  },
  {
    id: "003", 
    quote: "Do, or do not. There is no try.",
    author: "Yoda",
    category: "philosophy",
    period: 1980,
    image: "https://images.unsplash.com/photo-1514050566906-8d077bae7046?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80g"
  },
  {
    id: "004",
    quote: "Goals are the fuel in the furnace of achievement.",
    author: "Brian Tracy",
    category: "motivation",
    period: 2000,
    image: "https://images.unsplash.com/photo-1514050566906-8d077bae7046?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80"
  }
];
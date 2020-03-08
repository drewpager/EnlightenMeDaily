require("dotenv").config();

import { ObjectId } from 'mongodb';
import { connectDatabase } from '../src/database';
import { Quote } from '../src/lib/type';

const seed = async () => {
  try {
    console.log(`[seed]: attempting to seed the database`)

    const db = await connectDatabase();
    const quotes: Quote[] = [
      {
        _id: new ObjectId(),
        quote: "I think therefore I am",
        author: "René Descartes",
        category: "philosophy",
        period: 1500,
        image: "https://images.unsplash.com/photo-1509029032154-54ba8b3216d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
      },
      {
        _id: new ObjectId(),
        quote: "Slow is smooth and smooth is fast",
        author: "US Military Adage",
        category: "philosophy",
        period: 1900,
        image: "https://images.unsplash.com/photo-1508530786855-dfea35260b8d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" 
      },
      {
        _id: new ObjectId(), 
        quote: "Do, or do not. There is no try.",
        author: "Yoda",
        category: "philosophy",
        period: 1980,
        image: "https://images.unsplash.com/photo-1514050566906-8d077bae7046?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80g"
      },
      {
        _id: new ObjectId(),
        quote: "Goals are the fuel in the furnace of achievement.",
        author: "Brian Tracy",
        category: "motivation",
        period: 2000,
        image: "https://images.unsplash.com/photo-1514050566906-8d077bae7046?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80"
      }
    ];
    for (const quote of quotes) {
      await db.quotes.insertOne(quote);
    }
    console.log(`[seed]: success`)
  } catch (error) {
    throw new Error(`Failed to seed Database: ${error}`)
  }
}

seed();
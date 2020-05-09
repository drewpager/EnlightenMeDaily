require("dotenv").config();

import { ObjectId } from 'mongodb';
import { connectDatabase } from '../src/database';
import { Quote, QuoteType, User, Bookmarking } from '../src/lib/type';
import { quoteSmall } from './quote-small';

const seed = async () => {
  try {
    console.log(`[seed]: attempting to seed the database`)

    const db = await connectDatabase();
    quoteSmall;

    const bookmarkings: Bookmarking[] = [
      {
        _id: new ObjectId(),
        quote: {
          _id: new ObjectId(), 
          quote: "Goals are the fuel in the furnace of achievement.",
          author: "Brian Tracy",
          category: "motivation",
          period: 2000,
          image: "https://images.unsplash.com/photo-1514050566906-8d077bae7046?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80",
          type: QuoteType.Quote
        },
        user: "5d398db94e84753160e08b51"
      }
    ]

    const users: User[] = [
      {
        _id: "5d378db94e84753170e08b55",
        token: "token_************",
        name: "Jimmy Johns",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
        contact: "jimmy.j.johns@yahoo.com",
        bookmarkings: [],
        quotes: [
          new ObjectId("5d378db94e84753161e08b30"),
          new ObjectId("5d378db94e84753170e08b4a"),
          new ObjectId("5d378db94e84753160e18b4d")
        ]
      },
      {
        _id: "5d378db94e84753160e08b51",
        token: "token_************",
        name: "Leslie Pierce",
        avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
        contact: "leslie.pierce@yahoo.com",
        bookmarkings: [],
        quotes: [
          new ObjectId("5d378db94e84753160e08b32"),
          new ObjectId("5d378db94e84753160e08b4a"),
          new ObjectId("5d378db94e84753160e08b4d")
        ]
      } 
    ];
    for (const quote of quoteSmall) {
      await db.quotes.insertOne(quote);
    }

    for (const user of users) {
      await db.users.insertOne(user);
    }

    for (const bookmark of bookmarkings) {
      await db.bookmarkings.insertOne(bookmark);
    }
    
    console.log(`[seed]: success`)
  } catch (error) {
    throw new Error(`Failed to seed Database: ${error}`)
  }
}

seed();
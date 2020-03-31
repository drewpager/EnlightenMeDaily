require("dotenv").config();

import { ObjectId } from 'mongodb';
import { connectDatabase } from '../src/database';
import { Quote, QuoteType, User, Bookmarking } from '../src/lib/type';

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
        image: "https://images.unsplash.com/photo-1509029032154-54ba8b3216d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
        type: QuoteType.Quote
      },
      {
        _id: new ObjectId(),
        quote: "Slow is smooth and smooth is fast",
        author: "US Military Adage",
        category: "philosophy",
        period: 1900,
        image: "https://images.unsplash.com/photo-1508530786855-dfea35260b8d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        type: QuoteType.Quote
      },
      {
        _id: new ObjectId(), 
        quote: "Do, or do not. There is no try.",
        author: "Yoda",
        category: "philosophy",
        period: 1980,
        image: "https://images.unsplash.com/photo-1514050566906-8d077bae7046?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80g",
        type: QuoteType.Quote
      },
      {
        _id: new ObjectId(),
        quote: "Goals are the fuel in the furnace of achievement.",
        author: "Brian Tracy",
        category: "motivation",
        period: 2000,
        image: "https://images.unsplash.com/photo-1514050566906-8d077bae7046?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80",
        type: QuoteType.Quote
      },
      {
        _id: new ObjectId(),
        quote:"Leadership is not about a title or a designation. It's about impact, influence and inspiration. Impact involves getting results, influence is about spreading the passion you have for your work, and you have to inspire teammates and customers.",
        author:'Robin S. Sharma',
        category:'leadership',
        period: 2,
        image:'https://images.unsplash.com/photo-1533511627347-4d1b893e1ad9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2044&q=80',
        type:QuoteType.Quote
      },
      {
        _id:new ObjectId(),
        quote:'The supreme quality for leadership is unquestionably integrity. Without it, no real success is possible, no matter whether it is on a section gang, a football field, in an army or in an office.',
        author:'Dwight D. Eisenhower',
        category:'leadership',
        period:3,
        image:'https://images.unsplash.com/photo-1533511627347-4d1b893e1ad9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2044&q=80',
        type:QuoteType.Quote
      },
      {
        _id:new ObjectId(),
        quote:'A leader is best when people barely know he exists, when his work is done, his aim fulfilled, they will say; we did it ourselves.',
        author:'Lao Tzu',
        category:'leadership',
        period:4,
        image:'https://images.unsplash.com/photo-1533511627347-4d1b893e1ad9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2044&q=80',
        type:QuoteType.Quote
      },
      {
        _id:new ObjectId(),
        quote:"Ultimately, leadership is not about glorius crowning acts. It's about keeping your team focused on a goal and motivated to do their best to achieve it, especially when the stakes are high and the consequences really matter. It is about laying the groundwork for others' success, and then standing back and letting them shine.",
        author:'Chris Hadfield',
        category:'leadership',
        period:5,
        image:'https://images.unsplash.com/photo-1533511627347-4d1b893e1ad9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2044&q=80',
        type:QuoteType.Quote
      }
    ];

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
    for (const quote of quotes) {
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
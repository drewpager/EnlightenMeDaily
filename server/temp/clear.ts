require("dotenv").config();

import { connectDatabase } from '../src/database/index';

export const clear = async () => {
  try {
    console.log(`[clear]: attempting to clear`);
    const db = await connectDatabase();

    // const bookmarkings = await db.bookmarkings.find({}).toArray();
    const users = await db.users.find({}).toArray();
    const quotes = await db.quotes.find({}).toArray();

    // if (bookmarkings.length > 0) {
    //   await db.bookmarkings.drop();
    // }

    if (users.length > 0) {
      await db.users.drop();
    }

    if (quotes.length > 0) {
      await db.quotes.drop();
    }

    console.log(`[clear]: successfully cleared database`);
  } catch (error) {
    throw new Error(`Failed to run clear script: ${error}`);
  }
}

clear();

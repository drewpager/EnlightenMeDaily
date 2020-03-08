require("dotenv").config();

import { MongoClient } from 'mongodb';

import { Database } from '../lib/type';

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const cluster = process.env.MONGO_CLUSTER;

const url = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/test?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = client.db("quotes");

  return {
    quotes: db.collection("test_quotes")
  }
} 
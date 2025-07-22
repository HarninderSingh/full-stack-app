// lib/mongodb.ts
import { MongoClient } from 'mongodb';

declare global {
  // allow global `var` usage in Node
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

const uri: string = process.env.MONGODB_URI;
const options = {};

let client = new MongoClient(uri, options);

const clientPromise =
  global._mongoClientPromise ?? (global._mongoClientPromise = client.connect());

export default clientPromise;

require('dotenv').config();
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI);

let db;

const connectMongo = async () => {
  if (!db) {
    await client.connect();
    db = client.db(process.env.MONGO_DB);
    console.log('Conectado a MongoDB');
  }
  return db;
};

module.exports = connectMongo;

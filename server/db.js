const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://db';

// Database Name
const dbName = 'open_weather';

let mongoClient = null;

// Use connect method to connect to the server
function connectDb() {
  return MongoClient.connect(url);
}

async function getDb() {
  if (mongoClient) {
    return mongoClient.db(dbName);
  }

  try {
    const client = await connectDb();

    mongoClient = client;

    return client.db(dbName);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  connectDb,
  getDb,
};

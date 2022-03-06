const { MongoClient } = require("mongodb");

const password = "ZgbMaQmbS7bQdpHe";
const dbName = "alMuhsee";

// const uri = "mongodb://localhost/alMuhseeDB";
const uri = `mongodb+srv://alMuhseeAdmin:${password}@cluster0.1pjky.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

// MongoClient.connect(uri, (err, db) => {
//   console.log("MongoDB connected");
//   db.close();
// });

const connect = async () => {
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
  } finally {
    // Close the connection to the MongoDB cluster
    // await client.close();
  }
};

connect();

const getTermVerses = async (term) => {
  connect();
  const result = await client
    .db("alMuhsee")
    .collection("terms")
    .findOne({ term });

  if (term && result) {
    console.log(`Found a listing in the collection with the name '${term}':`);
    console.log(result);
    return result;
  } else {
    console.log(`No listings found with the name '${term}'`);
  }
};

module.exports = {
  getTermVerses,
};

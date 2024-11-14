// run in terminal: /users/bekzodisakov/mongodb/bin/mongod --dbpath=/users/bekzodisakov/mongodb-data
// const mongoose = require("mongoose");

// mongoose
//   .connect("mongodb://127.0.0.1:27017/data-box")
//   .then(() => console.log("Successfully connected to MongoDB!"))
//   .catch((error) => console.error("Connection error:", error));

const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require('mongoose');
require("dotenv").config();

async function connectDB() {
  try {
      await mongoose.connect(process.env.MONGODB_URI, {
          // Optional configurations
          serverSelectionTimeoutMS: 5000, // Timeout after 5s
          socketTimeoutMS: 45000,         // Close sockets after 45s
      });
      console.log('Successfully connected to MongoDB Atlas');
  } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);  // Exit if cannot connect
  }
}

// Option 2: Using event listeners (alternative approach)
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

connectDB()


// // Replace the placeholder with your Atlas connection string
// const uri = process.env.MONGODB_URI;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();

//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } catch (error) {
//     console.error("Connection error:", error);
//     await client.close();
//     throw error;
//   }
// }
// run().catch(console.dir);

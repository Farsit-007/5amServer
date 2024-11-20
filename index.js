const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://project:BVOHcfG10wmVXfLJ@cluster0.xs1g9z6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const usersCollection = client.db("employ").collection("users");

    // Add a new user
    app.post("/add-user", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    // Get all users
    app.get("/get-user", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    // Delete a user by ID
    app.delete("/delete-user/:id", async (req, res) => {
      const id = req.params.id;
      const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.get("/get-user/:id", async (req, res) => {
      const id = req.params.id;
      const user = await usersCollection.findOne({ _id: new ObjectId(id) });
      res.send(user);
    });

    // Update a user by ID
    app.patch("/update-user/:id", async (req, res) => {
      const updatedUser = req.body;
      const result = await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedUser }
      );

      res.send(result);
    });

    console.log("You successfully connected to MongoDB!");
  } finally {
    // Leave the client open for reuse
    // await client.close();
  }
}
run().catch(console.dir);

// Root route
app.get("/", (req, res) => {
  res.send("Mid is running");
});

app.listen(port, () => {
  console.log(`Mid is running on ${port}`);
});

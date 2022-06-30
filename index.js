const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello From To-Do List!");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

//Connecting to Database
const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_password}@cluster0.etm3opb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const toDoCollection = client.db("to-do-list").collection("to-do-items");
    console.log("DB connected!");

    //Displaying all to-dos
    app.get("/todos", async (req, res) => {
      const toDos = await toDoCollection.find().toArray();
      res.send(toDos);
    });
    //Adding new task
    app.post("/addTask", async (req, res) => {
      const task = req.body;
      const insertedTask = await toDoCollection.insertOne(task);
      res.send(insertedTask);
    });
  } finally {
  }
}
run().catch(console.dir);

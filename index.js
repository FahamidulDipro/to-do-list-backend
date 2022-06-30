const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    const completedTaskCollection = client
      .db("to-do-list")
      .collection("completed-tasks");
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
    //Updating task
    app.put("/editTask", async (req, res) => {
      const { taskId, todoItem } = req.body;
      console.log(taskId, todoItem);
      const filter = { _id: ObjectId(taskId) };
      const option = { upsert: true };
      const updatedDoc = {
        $set: {
          todoItem: todoItem,
        },
      };
      const result = await toDoCollection.updateOne(filter, updatedDoc, option);
      res.send(result);
    });
    //Deleting Task
    app.delete("/deleteTask/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectId(id) };
      const deletedTask = await toDoCollection.deleteOne(query);
      res.send(deletedTask);
    });
    //Checkbox insert
    app.post("/completedTasks", async (req, res) => {
      const task = req.body;
      console.log(task);
      const insertedTask = await completedTaskCollection.insertOne(task);
      res.send(insertedTask);
    });
    //Deleting Task from completed
    app.delete("/deleteFromCompleted/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectId(id) };
      const deletedTask = await completedTaskCollection.deleteOne(query);
      res.send(deletedTask);
    });
    //Loading from Completed Tasks
    app.get("/completedTasks", async (req, res) => {
      const completedTasks = await completedTaskCollection.find().toArray();
      res.send(completedTasks);
    });
  } finally {
  }
}
run().catch(console.dir);

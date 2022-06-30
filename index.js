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
    console.log("DB connected!");
  } finally {
  }
}
run().catch(console.dir);

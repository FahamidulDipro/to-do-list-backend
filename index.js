const express = require("express");
const cors = require("cors");
require("dotenv").config();
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

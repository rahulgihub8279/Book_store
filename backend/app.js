import express from "express";
import dotenv from "dotenv";
dotenv.config();
import db_connect from "./conn/connection.js";
const app = express();

db_connect();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("testing 12 ...");
});

app.listen(process.env.PORT, () => {
  console.log(`server is listenig on ${process.env.PORT}`);
});

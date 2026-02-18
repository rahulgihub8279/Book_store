import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();
import db_connect from "./conn/connection.js";
db_connect();
import cartRoute from "./routes/cart.js";
import userRouter from "./routes/user.js";
import adminRouter from "./routes/book.js";
import orderRoute from "./routes/order.js";
import favouriteRoute from "./routes/favourite.js";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/api/v1", userRouter);
app.use("/api/v1", adminRouter);
app.use("/api/v1", favouriteRoute);
app.use("/api/v1", cartRoute);
app.use("/api/v1", orderRoute);

app.get("/", (req, res) => {
  res.send("home");
});

app.listen(process.env.PORT, () => {
  console.log(`server is listenig on ${process.env.PORT}`);
});

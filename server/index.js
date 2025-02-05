const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
app.use(cors())
app.use(express.json())
const ProductRouter = require("./routers/productRouter")
const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");

app.get("/", (req, res) => {
    res.send("Welcome Emin`s data!");
});
const PASSWORD = "eminovemin199";
const Base_Url =
  "mongodb+srv://eminovemin199:eminovemin199@eminfullstack-project.mbhs8.mongodb.net/fullStack-practica?retryWrites=true&w=majority&appName=EminFullStack-Project";
const Port = 8080;

app.use("/api/products",ProductRouter)
app.use("/api/users", userRouter);
app.use("/api", authRouter);
mongoose.connect(Base_Url).then(() => {
  app.listen(Port, () => {
    console.log(`http://localhost:${Port}`);
  });
  console.log("Connected!");
});
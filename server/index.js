const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv")
const multer = require("multer");
const path = require("path");
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

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, //max: 5MB
});

app.post("/imageUpload", upload.single("image"), function (req, res, next) {
  console.log(req.file);
});

mongoose.connect(Base_Url).then(() => {
  app.listen(Port, () => {
    console.log(`http://localhost:${Port}`);
  });
  console.log("Connected!");
});
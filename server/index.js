const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const UserModel = require("./modules/userModel");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const authMiddleware = require("./middlewares/authMiddlewares");

// Router'ları dahil et
const ProductRouter = require("./routers/productRouter");
const TvRouter = require("./routers/tvRouter");
const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");
const paymentRouter = require("./routers/paymentRouter");
// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to Emin's data!");
});

// MongoDB Bağlantısı
const PASSWORD = "eminovemin199";
const Base_Url =
  "mongodb+srv://eminovemin199:eminovemin199@eminfullstack-project.mbhs8.mongodb.net/fullStack-practica?retryWrites=true&w=majority&appName=EminFullStack-Project";
const Port = 8080;

// Router'lar
app.use("/api/products", ProductRouter);
app.use("/api/tv", TvRouter);
app.use("/api/users", userRouter);
app.use("/api", authRouter);

// Dosya yükleme işlemleri için multer yapılandırması
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
  limits: { fileSize: 5 * 1024 * 1024 }, // max: 5MB
});

// Görsel yükleme endpoint
app.post("/imageUpload", upload.single("image"), function (req, res, next) {
  console.log(req.file);
  res
    .status(200)
    .json({ message: "Image uploaded successfully", file: req.file });
});

// Router'ı kullan
app.use("/api", paymentRouter);



// MongoDB bağlantısı ve server başlatma
mongoose.connect(Base_Url).then(() => {
  app.listen(Port, () => {
    console.log(`Server is running on http://localhost:${Port}`);
  });
  console.log("Connected to MongoDB!");
});

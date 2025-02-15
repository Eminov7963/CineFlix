const express = require("express");
const {
  getAllTvShows,
  getTvShowByID,
  deleteTvShow,
  postTvShow,
  updateTvShow,
} = require("../controllers/tvController");
const authMiddleware = require("../middlewares/authMiddlewares");

const router = express.Router();

// 📌 Tüm TV dizilerini getir (User ve Admin erişebilir)
router.get("/", authMiddleware(["user", "admin"]), getAllTvShows);

// 📌 Belirli bir TV dizisini getir (User ve Admin erişebilir)
router.get("/:id", authMiddleware(["user", "admin"]), getTvShowByID);

router.delete("/:id", authMiddleware(["admin"]), deleteTvShow);

// 📌 Yeni bir TV dizisi ekle (Sadece Admin erişebilir)
router.post("/", authMiddleware(["admin"]), postTvShow);

// 📌 TV dizisini güncelle (Sadece Admin erişebilir)
router.put("/:id", authMiddleware(["admin"]), updateTvShow);

// 📌 TV dizisini sil (Sadece Admin erişebilir)


module.exports = router;

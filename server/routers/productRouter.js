const express = require("express");
const {
  getAllData,
  getDataByID,
  deleteData,
  postData,
  updateData,
} = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddlewares");
const router = express.Router();

router.get("/", authMiddleware(["user", "admin"]), getAllData);
router.get("/:id", authMiddleware(["user", "admin"]), getDataByID);
router.delete("/:id", authMiddleware(["admin"]), deleteData);
router.post(
  "/",
  authMiddleware(["admin"]),
  postData
);
router.put("/:id", authMiddleware(["admin"]), updateData);

module.exports = router;

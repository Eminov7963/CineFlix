const express = require("express");
const {
  getAllData,
  getDataByID,
  deleteData,
  postData,
  updateData,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getAllData);
router.get("/:id", getDataByID);
router.delete("/:id", deleteData);
router.post("/", postData);
router.put("/:id", updateData);

module.exports = router;

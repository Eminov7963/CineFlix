const express = require("express");
const { manualPaymentSuccess } = require("../controllers/paymentController");
const authMiddleware = require("../middlewares/authMiddlewares");
const router = express.Router();

// Manual payment success endpoint
router.patch(
  "/manual-payment-success",
  authMiddleware(["user", "admin"]),
  manualPaymentSuccess
);

module.exports = router;

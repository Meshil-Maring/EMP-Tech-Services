import express from "express";
import { transactionController } from "../controller/transaction.controller.js";

import {
  createOrder,
  verifyPayment,
} from "../controller/payment.controller.js";

const router = express.Router();

// api/payment
router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);
router.post("/transaction", transactionController);

export default router;

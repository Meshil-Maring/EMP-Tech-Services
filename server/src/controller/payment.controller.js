import razorpay from "../config/razorpay.config.js";
import { createTransaction } from "../module/transaction.module.js";

export const createOrder = async (req, res) => {
  try {
    const { amount, plan } = req.body;

    // create order
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
    });

    // save PENDING transaction immediately
    await createTransaction({
      orderId: order.id,
      name: req.user?.name || "Guest",
      phoneNumber: req.user?.phone || null,
      date: new Date(),
      method: null,
      plan,
      amount,
      status: "PENDING",
    });

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Order creation failed" });
  }
};

export const verifyPayment = (req, res) => {
  const isValid = verifySignature(req.body);

  if (!isValid) return res.status(400).json({ error: "Invalid payment" });

  res.json({ success: true });
};

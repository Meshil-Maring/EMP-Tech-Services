import razorpay from "../config/razorpay.config.js";
import { createTransaction } from "../module/transaction.module.js";
import verifySignature from "../utils/verify-signature.js";

export const createOrder = async (req, res) => {
  try {
    const { data } = req.body;

    console.log(data.amount);

    // Razor pay order
    const amountInPaise = Number(data.amount) * 100;

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
    });

    // save PENDING transaction immediately
    await createTransaction({
      orderId: order.id,
      userId: data.userId,
      name: data.name || "Guest",
      phoneNumber: data.phone || null,
      email: data.email,
      date: new Date(),
      method: null,
      plan: data.plan,
      amount: data.amount,
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

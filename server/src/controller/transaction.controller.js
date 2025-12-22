import { createTransaction } from "../module/transaction.module.js";

export const transactionController = async (req, res) => {
  try {
    const transaction = await createTransaction(req.body);
    res.status(201).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create transaction" });
  }
};

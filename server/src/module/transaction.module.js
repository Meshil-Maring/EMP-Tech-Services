import db from "../config/db.js";

export const createTransaction = async ({
  userId,
  paymentId = null,
  orderId,
  name,
  email,
  phoneNumber,
  date,
  method,
  plan,
  amount,
  status = "PENDING",
}) => {
  const query = `
    INSERT INTO transactions
    (user_id, payment_id, order_id, name, email, phone_number, date, method, plan_name, amount, status)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *;
  `;

  const values = [
    userId,
    paymentId,
    orderId,
    name,
    email,
    phoneNumber,
    date,
    method,
    plan,
    amount,
    status,
  ];

  const { rows } = await db.query(query, values);
  return rows[0];
};

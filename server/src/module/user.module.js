import db from "../config/db.js";

// Creating new user
export const newUser = async (name, email, password) => {
  const { rows } = await db.query(
    `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email
    `,
    [name, email, password]
  );

  return rows[0];
};

// Finding user by email
export const findByEmail = async (email) => {
  const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  return rows[0];
};

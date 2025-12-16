import express from "express";
import sql from "../config/db.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    // hash password
    const saltedPassword = await bcrypt.hash(password, 12);

    // insert user
    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${userName}, ${email}, ${saltedPassword})
    `;

    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    // UNIQUE email error
    if (err.code === "23505") {
      return res.status(409).json({
        error: "Email already exists",
        status: 409,
      });
    }

    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;

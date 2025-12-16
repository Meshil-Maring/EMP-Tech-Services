import express from "express";
import sql from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await sql`SELECT * FROM users`;
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB connection failed" });
  }
});

export default router;

import bcrypt from "bcrypt";
import { newUser } from "../module/user.module.js";

export const createUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await newUser(userName, email, hashedPassword);

    req.session.userId = user.id;

    req.session.save(() => {
      res.status(201).json({
        message: "Account created successfully",
        user,
      });
    });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: "Something went wrong" });
  }
};

import express from "express";
import { createUser } from "../controller/create-user.js";
import { login } from "../controller/login.js";
import { logout } from "../controller/log-out.js";

const router = express.Router();

router.post("/sign-up", createUser);
router.post("/log-in", login);
router.post("/log-out", logout);

export default router;

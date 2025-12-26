import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";

import { isAuth } from "./src/middleware/isAuth.js";
import usersRoute from "./src/routes/users.js";
import { intouchSendEmail } from "./src/controller/intouch-send-email.js";
import sessionConfig from "./src/config/session.js";
import paymentRoutes from "./src/routes/payment.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    `default-src 'self'; connect-src 'self' http://localhost:5000 http://localhost:5173`
  );

  next();
});

// Session config
app.use(session(sessionConfig));

app.use("/auth", usersRoute);

// Protected route
app.get("/api/check-auth", isAuth, (req, res) => {
  res.status(200).json({ userid: req.session.userId });
});

// Public route
app.post("/send-mail", intouchSendEmail);

app.use("/api/payment", paymentRoutes);

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

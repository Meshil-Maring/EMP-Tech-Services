import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

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
    origin: ["https://epmtechservice.com", "https://www.epmtechservice.com"],
    credentials: true,
  })
);

app.use(express.json());

app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
      "connect-src 'self' https://epm-tech-service.onrender.com https://epmtechservice.com https://www.epmtechservice.com; " +
      "img-src 'self' data: https:; " +
      "style-src 'self' 'unsafe-inline'; " +
      "script-src 'self' 'unsafe-inline';"
  );
  next();
});

app.set("trust proxy", 1);

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

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

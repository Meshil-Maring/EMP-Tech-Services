import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";

import { isAuth } from "./src/middleware/isAuth.js";
import usersRoute from "./src/routes/users.js";
import { intouchSendEmail } from "./src/controller/intouch-send-email.js";

dotenv.config();

const app = express();
const PORT = 5000;

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
    "default-src 'self'; connect-src 'self' http://localhost:5000 http://localhost:5173"
  );

  next();
});

app.use(
  session({
    name: "session-id",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use("/auth", usersRoute);

app.get("/check-session", (req, res) => {
  res.json({
    session: req.session,
    userId: req.session.userId,
  });
});

// Protected route
app.get("/protected", isAuth, (req, res) => {
  res.json({ message: "Welcome" });
});

// Public route
app.post("/send", intouchSendEmail);

app.listen(PORT, () => console.log("Server running on", PORT));

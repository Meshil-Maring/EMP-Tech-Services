import express from "express";
import cors from "cors";
import mail from "./src/services/mail.js";
import usersRoute from "./src/routes/users.js";

import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;
app.use(cors());

app.use(express.json());

app.post("/send", (req, res) => {
  const data = req.body;

  res.json("Sucessfully send");

  mail(data);
});

app.use("/api/users", usersRoute);

app.listen(PORT, () => console.log("Server port: ", PORT));

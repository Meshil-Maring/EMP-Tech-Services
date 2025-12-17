import mail from "../services/mail.js";

export const intouchSendEmail = (req, res) => {
  (req, res) => {
    const data = req.body;

    res.json("Sucessfully send");

    mail(data);
  };
};

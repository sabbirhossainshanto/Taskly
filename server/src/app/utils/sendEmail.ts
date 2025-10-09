import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.NODE_ENV === "production",
    auth: {
      user: config.email_user,
      pass: config.email_pass,
    },
  });

  await transporter.sendMail({
    from: config.email_user,
    to,
    subject: "Invite workspace!",
    text: "Join workspace via this link!",
    html,
  });
};

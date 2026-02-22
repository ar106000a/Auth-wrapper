import nodemailer from "nodemailer";
export const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  port: 587,
  auth: {
    user: process.env.TRANSPORTER_EMAIL,
    pass: process.env.TRANSPORTER_PASS, // not your Gmail password, but an "App password"
  },
  connectionTimeout: 10000, // 10 seconds
});

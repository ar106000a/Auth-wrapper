import nodemailer from "nodemailer";
export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com", // Add host explicitly
  port: 465, // Try switching to 465
  secure: true, // Must be true for 465
  auth: {
    user: process.env.TRANSPORTER_EMAIL,
    pass: process.env.TRANSPORTER_PASS, // not your Gmail password, but an "App password"
  },
  connectionTimeout: 10000, // 10 seconds
  tls: {
    rejectUnauthorized: false, // Helps with some cloud certificate issues
  },
});

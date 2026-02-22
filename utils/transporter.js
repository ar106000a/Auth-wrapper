console.log("DEBUG AUTH:", {
  user: process.env.EMAIL_USER ? "Exists" : "MISSING",
  clientId: process.env.GMAIL_CLIENT_ID ? "Exists" : "MISSING",
  clientSecret: process.env.GMAIL_CLIENT_SECRET ? "Exists" : "MISSING",
  refreshToken: process.env.GMAIL_REFRESH_TOKEN ? "Exists" : "MISSING",
});
import nodemailer from "nodemailer";
export const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Transporter Error:", error);
  } else {
    console.log("✅ Server is ready to send emails!");
  }
});

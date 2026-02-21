import jwt from "jsonwebtoken";
import "dotenv/config";

// Token generation functions
export const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (userId) => {
  const sessionStart = Date.now();
  return jwt.sign({ userId, sessionStart }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
};

export const generateResetToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_RESET_SECRET, {
    expiresIn: "10m",
  });
};

export const generateEmailToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_CONFIRM_SECRET, {
    expiresIn: "10m",
  });
};

import rateLimit, { ipKeyGenerator } from "express-rate-limit";
export const createLimiter = (windowMs, max) => {
  return rateLimit({
    windowMs: windowMs,
    max: max,
    standardHeaders: true,
    legacyHeaders: false,

    message: {
      error: "Too many requests, calm down nigger!",
      error_info: {
        error_code: "TOO MANY REQUESTS",
        error_message: "Too many requests, calm down nigger!",
      },
    },

    keyGenerator: (req) => {
      if (req.user?.id) {
        return `user:${req.user.id}`;
      }
      const key = ipKeyGenerator(req.ip);
      // console.log("Type:", typeof key);
      // console.log("Value:", key);
      return key;
    },
  });
};

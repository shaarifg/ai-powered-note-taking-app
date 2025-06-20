import jwt from "jsonwebtoken";
import AppError from "./app.error.js";
import appConfig from "../config/app.config.js";

export const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
  };

  return jwt.sign(payload, appConfig.jwt.secret, {
    expiresIn: appConfig.jwt.expiresIn,
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, appConfig.jwt.secret);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new AppError("Session expired. Please login again.", 401);
    }
    throw new AppError("Invalid token. Unauthorized.", 401);
  }
};

export const getDeviceDetails = (req) => {
  const userAgent = req.headers["user-agent"] || "Unknown";
  const ipAddress =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.connection.remoteAddress;

  let deviceType = "desktop";
  if (/mobile/i.test(userAgent)) deviceType = "mobile";
  else if (/tablet|ipad/i.test(userAgent)) deviceType = "tablet";

  return { userAgent, ipAddress, deviceType };
};

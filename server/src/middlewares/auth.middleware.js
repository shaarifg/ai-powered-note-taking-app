import SessionService from "../services/session.service.js";
import AppError from "../utils/app.error.js";
import { verifyToken } from "../utils/auth.util.js";

export const protect = () => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new AppError("Token is not provided", 401));
      }

      const token = authHeader.split(" ")[1];
      const decoded = verifyToken(token);

      await SessionService.validateSession(token);

      req.userId = decoded.id;
      req.token = token;

      next();
    } catch (err) {
      next(err);
    }
  };
};

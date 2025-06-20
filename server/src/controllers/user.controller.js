import { asyncHandler } from "../middlewares/async.handler.js";
import SessionService from "../services/session.service.js";
import UserService from "../services/user.service.js";

export const signedInUser = asyncHandler(async (req, res) => {
  const { userId } = req;
  const user = await UserService.getUseById(userId);
  res.status(200).json({ success: true, data: user, message: "user found" });
});

export const signOut = asyncHandler(async (req, res) => {
  const { userId, token } = req;
  const { message } = await SessionService.signOut(userId, token);
  res.status(200).json({ success: true, message });
});

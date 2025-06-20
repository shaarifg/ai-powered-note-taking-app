import { asyncHandler } from "../middlewares/async.handler.js";
import AuthService from "../services/auth.service.js";
import { getDeviceDetails } from "../utils/auth.util.js";

export const signup = asyncHandler(async (req, res) => {
  req.deviceDetails = getDeviceDetails(req);
  const { token, user } = await AuthService.signup(req.body, req.deviceDetails);
  res
    .status(201)
    .json({ success: true, token, data: user, message: "account created" });
});

export const signin = asyncHandler(async (req, res) => {
  req.deviceDetails = getDeviceDetails(req);
  const { token, user } = await AuthService.signin(req.body, req.deviceDetails);
  res
    .status(200)
    .json({ success: true, token, data: user, message: "signin success" });
});

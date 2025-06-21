import User from "../models/User.js";
import bcrypt from "bcryptjs";
import AppError from "../utils/app.error.js";
import { generateToken } from "../utils/auth.util.js";
import SessionService from "./session.service.js";

export default class AuthService {
  static async signup({ fullName, email, password }, deviceDetails) {
    const existing = await User.findOne({ email });
    if (existing) throw new AppError("Email already registered", 400);

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ fullName, email, password: hashed });

    const token = generateToken(user);

    await SessionService.createSession(user._id, token, deviceDetails);

    return {
      token,
      user: { id: user._id, fullName: user.fullName, email: user.email },
    };
  }

  static async signin({ email, password }, deviceDetails) {
    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new AppError("Invalid credentials", 403);

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new AppError("Invalid credentials", 403);

    const token = generateToken(user);

    await SessionService.createSession(user._id, token, deviceDetails);

    return {
      token,
      user: { id: user._id, fullName: user.fullName, email: user.email },
    };
  }
}

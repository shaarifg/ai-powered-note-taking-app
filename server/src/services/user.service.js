import User from "../models/User.js";
import AppError from "../utils/app.error.js";

export default class UserService {
  // get user details
  static async getUseById(userId) {
    const user = await User.findOne({ _id: userId, isActive: true });
    if (!user) AppError("User Not found", 400);
    return user;
  }
}

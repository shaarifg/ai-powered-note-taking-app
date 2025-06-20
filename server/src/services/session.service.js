import UserSession from "../models/UserSession.js";
import AppError from "../utils/app.error.js";

class SessionService {
  static async createSession(userId, token, deviceDetails) {
    const existing = await UserSession.findOne({
      userId,
      deviceType: deviceDetails.deviceType,
      userAgent: deviceDetails.userAgent,
      isActive: true,
    });

    if (existing) {
      existing.token = token;
      await existing.save();
      return;
    }

    await UserSession.create({
      userId,
      token,
      isActive: true,
      deviceType: deviceDetails.deviceType,
      ipAddress: deviceDetails.ipAddress,
      userAgent: deviceDetails.userAgent,
    });
  }

  static async validateSession(token) {
    const session = await UserSession.findOne({ token, isActive: true });
    if (!session) throw new AppError("Invalid or expired session", 401);
  }

  static async signOut(userId, token) {
    const session = await UserSession.findOneAndDelete({ userId, token });

    if (!session) throw new AppError("Session not found", 404);

    return { message: "User logged out successfully" };
  }
}

export default SessionService;

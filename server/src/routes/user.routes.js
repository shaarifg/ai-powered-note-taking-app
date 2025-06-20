import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { signedInUser, signOut } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", protect(), signedInUser);
router.get("/signout", protect(), signOut);

export default router;

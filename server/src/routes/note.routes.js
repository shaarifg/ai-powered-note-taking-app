import express from "express";
import {
  createNote,
  getUserNotes,
  getNote,
  updateNote,
  deleteNote,
  updatePosition,
  enhanceNote,
} from "../controllers/note.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect(), getUserNotes);
router.post("/", protect(), createNote);
router.get("/:noteId", protect(), getNote);
router.put("/:noteId", protect(), updateNote);
router.delete("/:noteId", protect(), deleteNote);
router.patch("/:noteId/position", protect(), updatePosition);
router.post("/:noteId/ai-enhance", protect(), enhanceNote);

export default router;

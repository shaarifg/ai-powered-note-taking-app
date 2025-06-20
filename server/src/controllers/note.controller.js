import { asyncHandler } from "../middlewares/async.handler.js";
import AIService from "../services/external-services/ai.service.js";
import NoteService from "../services/note.service.js";

export const createNote = asyncHandler(async (req, res) => {
  const { title, content, x, y } = req.body;
  const note = await NoteService.createNote({
    userId: req.userId,
    title,
    content,
    x,
    y,
  });
  res.status(201).json({ success: true, note });
});

export const getUserNotes = asyncHandler(async (req, res) => {
  const notes = await NoteService.getUserNotes(req.userId);
  res.json({ success: true, notes });
});

export const getNote = asyncHandler(async (req, res) => {
  const note = await NoteService.getNoteById(req.params.noteId, req.userId);
  res.json({ success: true, note });
});

export const updateNote = asyncHandler(async (req, res) => {
  const note = await NoteService.updateNote(
    req.params.noteId,
    req.userId,
    req.body
  );
  res.json({ success: true, note });
});

export const deleteNote = asyncHandler(async (req, res) => {
  const result = await NoteService.deleteNote(req.params.noteId, req.userId);
  res.json({ success: true, ...result });
});

export const updatePosition = asyncHandler(async (req, res) => {
  const { x, y } = req.body;
  const note = await NoteService.updatePosition(
    req.params.noteId,
    req.userId,
    x,
    y
  );
  res.json({ success: true, note });
});

export const enhanceNote = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  const { noteId } = req.params;

  const note = await NoteService.getNoteById(noteId, req.userId);

  const generated = await AIService.processContent({
    content: note.content || "",
    prompt,
  });

  res.json({
    success: true,
    note: {
      title: generated.title,
      content: generated.content,
    },
  });
});

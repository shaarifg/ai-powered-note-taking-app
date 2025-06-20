import Note from "../models/Note.js";
import AppError from "../utils/app.error.js";

class NoteService {
  static async createNote({ userId, title, content }) {
    const lastNote = await Note.findOne({ userId, isActive: true })
      .sort({ orderIndex: -1 })
      .select("orderIndex");

    const newOrderIndex = lastNote ? lastNote.orderIndex + 1 : 0;

    return await Note.create({
      userId,
      title,
      content,
      orderIndex: newOrderIndex,
    });
  }

  static async getUserNotes(userId) {
    return await Note.find({ userId, isActive: true }).sort({ orderIndex: 1 });
  }

  static async getNoteById(noteId, userId) {
    const note = await Note.findOne({ _id: noteId, userId, isActive: true });
    if (!note) throw new AppError("Note not found", 404);
    return note;
  }

  static async updateNote(noteId, userId, updates) {
    const note = await Note.findOneAndUpdate(
      { _id: noteId, userId },
      { $set: updates },
      { new: true }
    );
    if (!note) throw new AppError("Note not found or not yours", 404);
    return note;
  }

  static async deleteNote(noteId, userId) {
    const note = await Note.findOneAndUpdate(
      { _id: noteId, userId },
      { isActive: false },
      { new: true }
    );
    if (!note) throw new AppError("Note not found or not yours", 404);
    return { message: "Note deleted successfully" };
  }

  static async updateOrderIndex(noteId, userId, orderIndex) {
    const note = await Note.findOneAndUpdate(
      { _id: noteId, userId },
      { orderIndex },
      { new: true }
    );
    if (!note) throw new AppError("Unable to update order", 400);
    return note;
  }
}

export default NoteService;

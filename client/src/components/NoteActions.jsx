import { useNavigate } from "react-router-dom";
import { useNotes } from "../contexts/NotesContext";
import useApi from "../hooks/useApi";
import React from "react";

export default function NoteActions({ note }) {
  const navigate = useNavigate();
  const { dispatch } = useNotes();
  const { callApi } = useApi();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmed) return;

    try {
      await callApi({
        method: "DELETE",
        endpoint: `/notes/${note._id}`,
      });

      dispatch({ type: "DELETE_NOTE", payload: note._id });
    } catch {
      alert("Failed to delete note.");
    }
  };

  return (
    <React.Fragment>
      <button
        onClick={() => navigate(`/notes/${note._id}`)}
        title="Edit"
        className="text-green-600 hover:text-green-800"
      >
        <i className="fa-solid fa-pen"></i>
      </button>

      <button
        onClick={handleDelete}
        title="Delete"
        className="text-red-600 hover:text-red-800"
      >
        <i className="fa-solid fa-trash"></i>
      </button>
    </React.Fragment>
  );
}

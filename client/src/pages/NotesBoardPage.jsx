import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import noDataImage from "../assets/no-data.jpg";

import { useNotes } from "../contexts/NotesContext";
import NoteCard from "../components/NoteCard";
import useApi from "../hooks/useApi";
import NoteActions from "../components/NoteActions";

export default function NotesBoardPage() {
  const { notes, dispatch } = useNotes();
  const { callApi } = useApi();
  const [loading, setLoading] = useState(notes.length === 0);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await callApi({ method: "GET", endpoint: "/notes" });
      dispatch({ type: "SET_NOTES", payload: res.notes });
    } catch {
      console.error("Error fetching notes");
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over || active.id === over.id) return;

    const oldIndex = notes.findIndex((n) => n._id === active.id);
    const newIndex = notes.findIndex((n) => n._id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(notes, oldIndex, newIndex);
    dispatch({ type: "SET_NOTES", payload: reordered });

    for (let i = 0; i < reordered.length; i++) {
      await callApi({
        method: "PUT",
        endpoint: `/notes/${reordered[i]._id}`,
        data: { orderIndex: i },
      });
    }
  };

  useEffect(() => {
    if (notes.length === 0) fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-12">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={(e) => setActiveId(e.active.id)}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={notes.map((note) => note._id)}
          strategy={rectSortingStrategy}
        >
          {!loading && notes.length > 0 && (
            <h2 className="text-xl font-semibold text-gray-800 mb-6 ">
              All Your Notes
            </h2>
          )}

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {loading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-full h-[200px] bg-gray-200 animate-pulse rounded"
                />
              ))
            ) : notes.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                <img
                  src={noDataImage}
                  alt="No notes"
                  className="h-40 w-auto mb-6"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No notes yet
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Get started by creating your first note.
                </p>
                <a
                  href="/create"
                  className="inline-block px-5 py-2 text-sm font-medium bg-primary text-white rounded hover:bg-gray-800 transition"
                >
                  + Create Note
                </a>
              </div>
            ) : (
              notes.map((note) => (
                <NoteSortableCard key={note._id} note={note} />
              ))
            )}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeId && (
            <NoteCard
              note={notes.find((n) => n._id === activeId)}
              isDragging={true}
            />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

function NoteSortableCard({ note }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: note._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="relative group">
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing"
      >
        <NoteCard note={note} />
      </div>

      <div className="mt-1 p-2 bg-white border-t border-gray-300 w-full flex justify-end gap-3 rounded-b">
        <NoteActions note={note} />
      </div>
    </div>
  );
}

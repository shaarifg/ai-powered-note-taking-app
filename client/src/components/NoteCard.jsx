export default function NoteCard({ note, isDragging = false }) {
  return (
    <div
      className={`w-full min-h-[200px] bg-white px-4 py-3 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <h3 className="text-sm font-semibold mb-2 text-gray-900 line-clamp-2">
        {note.title}
      </h3>

      <div
        className="text-sm text-gray-800 prose prose-sm max-w-none line-clamp-[9] overflow-hidden"
        dangerouslySetInnerHTML={{ __html: note.content }}
      />
    </div>
  );
}

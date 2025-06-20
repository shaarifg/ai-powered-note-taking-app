export default function Toolbar({ editor }) {
  if (!editor) return null;

  const btn = (cmd, icon, isActive = false, title = "") => (
    <button
      title={title}
      onClick={(e) => {
        e.preventDefault();
        cmd();
      }}
      className={`text-lg px-2 py-1 hover:bg-gray-100 rounded ${
        isActive ? "text-black font-bold bg-gray-200" : "text-gray-700"
      }`}
    >
      <i className={icon}></i>
    </button>
  );

  return (
    <div className="flex flex-wrap gap-1 text-sm mb-4 border border-gray-200 p-2 rounded bg-white">
      {btn(
        () => editor.chain().focus().toggleBold().run(),
        "fas fa-bold",
        editor.isActive("bold"),
        "Bold"
      )}
      {btn(
        () => editor.chain().focus().toggleItalic().run(),
        "fas fa-italic",
        editor.isActive("italic"),
        "Italic"
      )}
      {btn(
        () => editor.chain().focus().toggleStrike().run(),
        "fas fa-strikethrough",
        editor.isActive("strike"),
        "Strike"
      )}
      {btn(
        () => editor.chain().focus().toggleUnderline().run(),
        "fas fa-underline",
        editor.isActive("underline"),
        "Underline"
      )}

      {btn(
        () => editor.chain().focus().setTextAlign("left").run(),
        "fas fa-align-left",
        editor.isActive({ textAlign: "left" }),
        "Align Left"
      )}
      {btn(
        () => editor.chain().focus().setTextAlign("center").run(),
        "fas fa-align-center",
        editor.isActive({ textAlign: "center" }),
        "Align Center"
      )}
      {btn(
        () => editor.chain().focus().setTextAlign("right").run(),
        "fas fa-align-right",
        editor.isActive({ textAlign: "right" }),
        "Align Right"
      )}

      {btn(
        () => editor.chain().focus().toggleBulletList().run(),
        "fas fa-list-ul",
        editor.isActive("bulletList"),
        "Bullet List"
      )}
      {btn(
        () => editor.chain().focus().toggleTaskList().run(),
        "fas fa-square-check",
        editor.isActive("taskList"),
        "Task List"
      )}

      {btn(
        () => editor.chain().focus().setParagraph().run(),
        "fas fa-paragraph",
        editor.isActive("paragraph"),
        "Paragraph"
      )}
      {btn(
        () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        "fas fa-heading",
        editor.isActive("heading", { level: 1 }),
        "H1"
      )}
      {btn(
        () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        "fas fa-heading",
        editor.isActive("heading", { level: 2 }),
        "H2"
      )}

      <input
        type="color"
        onInput={(e) => editor.chain().focus().setColor(e.target.value).run()}
        className="w-6 h-6 p-0 bg-transparent cursor-pointer ml-2"
        title="Text Color"
      />
    </div>
  );
}

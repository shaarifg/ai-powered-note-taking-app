import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Toolbar from "../components/Toolbar";
import useApi from "../hooks/useApi";
import { useNotes } from "../contexts/NotesContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { marked } from "marked";

export default function CreateNotePage() {
  const { noteId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { notes, dispatch } = useNotes();
  const { callApi, loading } = useApi();

  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [prompt, setPrompt] = useState("");
  const [aiData, setAiData] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({ levels: [1, 2] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      TextStyle,
      Color,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "min-h-[200px] outline-none w-full bg-white p-4 text-sm text-gray-900 leading-relaxed",
        style: aiLoading ? "cursor: wait;" : "",
      },
    },
  });

  const isEditMode = !!noteId;

  // Reset state when switching to /create
  useEffect(() => {
    if (!noteId) {
      setTitle("");
      editor?.commands.setContent("");
      setPrompt("");
      setAiData(null);
    }
  }, [noteId, location.pathname]);

  useEffect(() => {
    const loadNote = async () => {
      if (!noteId || !editor) return;

      let targetNote = notes.find((n) => n._id === noteId);
      if (!targetNote) {
        try {
          const res = await callApi({
            method: "GET",
            endpoint: `/notes/${noteId}`,
          });
          targetNote = res.note;
          dispatch({ type: "ADD_NOTE", payload: res.note });
        } catch {
          setError("Note not found or deleted.");
          return;
        }
      }

      setTitle(targetNote.title);
      editor.commands.setContent(targetNote.content || "", false);
    };

    loadNote();
  }, [noteId, editor]);

  const handleSubmit = async () => {
    const content = editor?.getHTML();
    if (!title.trim() || !content || content.trim() === "<p></p>") {
      setError("Both title and content are required");
      return;
    }

    setError("");
    try {
      if (isEditMode) {
        const res = await callApi({
          method: "PUT",
          endpoint: `/notes/${noteId}`,
          data: { title, content },
        });
        dispatch({ type: "UPDATE_NOTE", payload: res.note });
      } else {
        const res = await callApi({
          method: "POST",
          endpoint: "/notes",
          data: { title, content },
        });
        dispatch({ type: "ADD_NOTE", payload: res.note });
        navigate(`/notes/${res.note._id}`);
      }
    } catch {
      setError("Failed to save note.");
    }
  };

  const handleAIEnhance = async () => {
    if (!noteId || !prompt.trim()) return;

    setAiLoading(true);
    setAiData(null);
    try {
      const res = await callApi({
        method: "POST",
        endpoint: `/notes/${noteId}/ai-enhance`,
        data: { prompt, title },
      });

      setAiData(res.note); // contains updated title + content
    } catch {
      setError("AI failed to enhance the note.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleAcceptAi = async () => {
    if (!noteId || !aiData?.content?.trim()) return;

    let htmlContent = marked.parse(aiData.content);
    htmlContent = htmlContent.replace(
      /<li>\s*\[x\]\s*(.*?)<\/li>/gi,
      `<li data-type="taskItem" data-checked="true"><span class="task-content">$1</span></li>`
    );
    htmlContent = htmlContent.replace(
      /<li>\s*\[\s\]\s*(.*?)<\/li>/gi,
      `<li data-type="taskItem" data-checked="false"><span class="task-content">$1</span></li>`
    );
    if (htmlContent.includes('data-type="taskItem"')) {
      htmlContent = htmlContent.replace(
        /<ul>(.*?)<\/ul>/s,
        `<ul data-type="taskList">$1</ul>`
      );
    }

    setTitle(aiData.title || title); // update title
    editor.commands.setContent(htmlContent, false);
    setAiData(null);

    await callApi({
      method: "PUT",
      endpoint: `/notes/${noteId}`,
      data: { title: aiData.title || title, content: htmlContent },
    });
    dispatch({
      type: "UPDATE_NOTE",
      payload: {
        _id: noteId,
        title: aiData.title || title,
        content: htmlContent,
      },
    });
  };

  const prebuiltPrompts = [
    "Polish and format the content professionally",
    "Summarize key points",
    "Enhance grammar, clarity, and structure",
  ];

  return (
    <div
      className={`p-6 max-w-3xl mx-auto bg-white ${
        aiLoading ? "cursor-wait" : ""
      }`}
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-900">
        {isEditMode ? "Edit Note" : "Create Note"}
      </h2>

      <input
        type="text"
        placeholder="Enter note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={aiLoading}
        className="w-full p-3 mb-4 bg-transparent border-b border-gray-300 text-lg font-medium placeholder:text-gray-400 focus:outline-none focus:border-black"
      />

      <Toolbar editor={editor} />
      <EditorContent editor={editor} />

      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

      {aiData?.content && (
        <div className="mt-8 border border-dashed border-purple-300 p-4 bg-purple-50">
          <h3 className="text-sm font-semibold text-purple-700 mb-2">
            AI Suggested Content
          </h3>

          <div className="prose prose-sm max-w-none text-gray-800">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                input: ({ checked, ...props }) => (
                  <input
                    type="checkbox"
                    disabled
                    checked={checked}
                    className="mr-2 accent-purple-600"
                  />
                ),
              }}
            >
              {aiData.content}
            </ReactMarkdown>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleAcceptAi}
              disabled={aiLoading}
              className="px-4 py-2 bg-green-600 text-white text-sm hover:bg-green-700 transition"
            >
              ✅ Accept AI Response
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-4 items-center">
        <button
          onClick={handleSubmit}
          disabled={loading || aiLoading}
          className="bg-primary text-white px-6 py-2 uppercase tracking-wide text-sm flex items-center gap-2"
        >
          {loading || aiLoading ? (
            <i className="fa-solid fa-circle-notch fa-spin"></i>
          ) : (
            <i className="fa-solid fa-floppy-disk"></i>
          )}
          {isEditMode ? "Update Note" : "Save Note"}
        </button>

        {isEditMode && (
          <div className="relative flex-1 min-w-[280px]">
            <div className="flex">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                disabled={aiLoading}
                placeholder="Ask AI to enhance your note..."
                className="w-full px-4 py-2 border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleAIEnhance}
                disabled={aiLoading || !prompt.trim()}
                className="ml-2 px-4 py-2 bg-purple-600 text-white text-sm flex items-center gap-2 shadow-sm hover:bg-purple-700 transition"
              >
                {aiLoading ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  <i className="fa-solid fa-wand-magic-sparkles animate-bounce" />
                )}
                Enhance
              </button>
            </div>

            {showSuggestions && (
              <div className="absolute z-10 w-full bg-white border mt-1 shadow-md text-sm">
                {prebuiltPrompts.map((text, i) => (
                  <div
                    key={i}
                    onClick={() => setPrompt(text)}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {text}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

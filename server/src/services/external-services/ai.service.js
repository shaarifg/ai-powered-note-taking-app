import AppError from "../../utils/app.error.js";

const OPENROUTER_API = "https://openrouter.ai/api/v1/chat/completions";
const AI_MODEL = "deepseek/deepseek-r1:free";

export default class AIService {
  static async processContent({ content, prompt, title = "" }) {
    if (!content || !prompt)
      throw new AppError("Missing content or prompt", 400);

    // 🧠 Reject gibberish/fake-looking content
    if (/^[a-z]{10,}$/i.test(content.trim()) || content.length < 20) {
      throw new AppError(
        "Content looks too random or short. Please provide meaningful input.",
        400
      );
    }

    const task = `
You are a brutal markdown note editor.
Do only what the prompt asks. Do not add new content unless it’s explicitly requested.
Fix all grammar, structure, and clarity issues — even if not asked.
Use rich formatting: headings (#), **bold**, _italic_, bullet points, and - [ ] task lists when natural.
Use emojis and icons where they improve readability or match tone 😊⚡📌✅.
Never explain your changes, and never prefix your response with labels like "markdown", "note", or "here is".
Always generate a clean, meaningful title as the first line using '# Title'.
Do NOT repeat the title again in the content body.
`.trim();

    const messages = [
      {
        role: "user",
        content: `${task}\n\nPROMPT: ${prompt.trim()}\n\nCONTENT:\n${content.trim()}`,
      },
    ];

    const response = await fetch(OPENROUTER_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model: AI_MODEL, messages }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new AppError(err?.message || "AI request failed", 500);
    }

    const raw = await response.json();
    const aiText = raw.choices?.[0]?.message?.content?.trim() || "";

    return this.parseAIOutput(aiText);
  }

  static parseAIOutput(text) {
    // Extract and remove the first title line (# ...)
    const titleMatch = text.match(/^#\s+(.+)$/m);
    const improvedTitle =
      titleMatch?.[1]?.trim().slice(0, 100) || "Untitled Note";

    const contentWithoutTitle = text.replace(/^#\s+.+\n+/m, "").trim();

    return {
      title: improvedTitle,
      content: contentWithoutTitle,
    };
  }
}

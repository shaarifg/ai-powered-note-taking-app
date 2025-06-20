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

    const wantsSummary = /summary|summarize|tl;dr/i.test(prompt);
    const task = wantsSummary
      ? `You are a brutal markdown note editor. Improve the note with rich formatting and provide a short summary at the end as '## Summary'.`
      : `You are a brutal markdown note editor. Improve the note using clean markdown. Never explain anything how you did.`;

    const markdownTips = `
- Never say 'here is' or any explanation.
- Fix grammar, structure, typos.
- Use # Headings, **bold**, _italic_, and - [ ] checkboxes where suitable.
- Summary must be at the end, as '## Summary',  if asked .
- No prefix like 'markdown:' or 'note:'.
`.trim();

    const messages = [
      {
        role: "user",
        content: `${task}\n\nPlease generate a proper title (as '# Title') based on the content. Do not repeat it inside the content body again.\n\nCONTENT:\n${content}\n\n${markdownTips}`,
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
    // Extract title from first H1
    const titleMatch = text.match(/^#\s+(.+)$/m);
    const improvedTitle =
      titleMatch?.[1]?.trim().slice(0, 100) || "Untitled Note";

    // Remove first # title line from content
    const contentWithoutTitle = text.replace(/^#\s+.+\n+/m, "").trim();

    return {
      title: improvedTitle,
      content: contentWithoutTitle,
    };
  }
}

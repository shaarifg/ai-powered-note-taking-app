import AppError from "../../utils/app.error.js";

const OPENROUTER_API = "https://openrouter.ai/api/v1/chat/completions";
const AI_MODEL = "deepseek/deepseek-r1:free";

export default class AIService {
  static async processContent({ content, prompt }) {
    if (!content || !prompt)
      throw new AppError("Missing content or prompt", 400);

    const wantsSummary = /summary|summarize|tl;dr/i.test(prompt);
    const task = wantsSummary
      ? `You are a brutal markdown note editor. First, improve and format the content in rich modern markdown. Then generate a short summary.`
      : `You are a brutal markdown note editor. Improve and format the content in modern markdown. Don't explain anything.`;

    const markdownTips = `
- Never add markdown word at the begining of your response.
- always fix the typo in english.
- Use **bold**, _italic_, and ~~strike~~ when needed.
- Format checklists as: - [x] Done and - [ ] Not done.
- Use headings (#, ##) properly.
- Don't return any explanations, only the final content.
`.trim();

    const messages = [
      {
        role: "user",
        content: `${task}\n\n---\nCONTENT:\n${content}\n\n${markdownTips}`,
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

    // Optional: Parse response into { title, content, summary }
    const parsed = this.parseAIOutput(aiText, wantsSummary);
    return parsed;
  }

  static parseAIOutput(text, wantsSummary) {
    const summaryRegex = /### Summary\s*\n([\s\S]*)/i;
    const summaryMatch = text.match(summaryRegex);
    const summary = summaryMatch ? summaryMatch[1].trim() : null;

    // Remove summary section from main content
    const cleanedContent = wantsSummary
      ? text.replace(summaryRegex, "").trim()
      : text.trim();

    const title =
      cleanedContent
        .match(/^#\s+(.*)/)?.[1]
        ?.trim()
        ?.slice(0, 100) || "Untitled Note";

    return {
      title,
      content: cleanedContent,
      summary: wantsSummary ? summary : null,
    };
  }
}

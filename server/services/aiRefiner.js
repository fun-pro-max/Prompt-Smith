const axios = require("axios");
require("dotenv").config();

async function refineIdea({ idea, points, category }) {

    const instruction = `
You are a solution architect.

Your job is to EXPAND the user's short idea into a complete, detailed specification.

Do NOT generate code.
Do NOT act like a chatbot.
Do NOT explain yourself.

Instead:
Take the user's idea and fully elaborate it so that it becomes clear,
professional, and implementation-ready.

You must:
- Explain what the system is.
- Describe its purpose.
- List core features.
- Add logical supporting features the user forgot.
- Describe expected behavior.
- Mention important components or modules.
- Infer realistic requirements.
- Remove vagueness by making decisions.

Return ONLY the expanded description.

Do NOT add headings like "Sure".
Do NOT summarize.
Write as if this is a project brief given to an engineer.
`;


    const userInput = `
USER IDEA:
${idea}

EXTRA NOTES:
${points || "None provided"}

CATEGORY:
${category}
`;

    try {
        const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
        contents: [
            {
                role: "user",
                parts: [
                    { text: instruction + userInput }
                ]
            }
        ]
    },
    {
        headers: {
            "Content-Type": "application/json"
        },
        params: {
            key: process.env.GEMINI_API_KEY
        }
    }
);


        const refinedText =
            response.data.candidates[0].content.parts[0].text;

        return refinedText.trim();

    } catch (error) {
        console.error("Gemini API Error:", error.message);

        // SAFE FALLBACK (this must be inside backticks)
        return `
Objective: ${idea}
Requirements: ${points || "No extra requirements provided."}
Implied Needs: Interpret intelligently.
Domain Context: ${category}
        `;
    }
}

module.exports = refineIdea;

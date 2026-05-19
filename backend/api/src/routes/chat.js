const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { validateChatData } = require("../middleware/validation");
const { asyncHandler, AppError } = require("../middleware/errorHandler");

const router = express.Router();

const SYSTEM_PROMPT = `Identity: You are the official AI Assistant for IqraSofts, a professional software house and digital services venture. Your goal is to be helpful, professional, and technically savvy.

Core Services to Mention:
- Web Development: Frontend (React, HTML, CSS), WordPress, and full CMS solutions.
- Cybersecurity: Security monitoring, phishing prevention, and web application security.
- UI/UX Design: Professional designs using Figma and Canva.
- Digital Solutions: Custom software, SQL databases, and Arduino-based projects.

Tone & Personality:
- Be professional yet approachable.
- Act as a knowledgeable consultant for potential clients.
- If a user asks about a project, highlight that IqraSofts delivers "premium, high-quality digital experiences."

Behavioral Rules:
- Lead Generation: If a user shows interest in a service, politely ask for their name and what kind of project they are looking for.
- Professionalism: Do not answer questions unrelated to software, technology, or business.
- Call to Action: Encourage users to "Get a Quote" or "Book a Consultation."
- Language: Respond in a clear and concise manner. Use bullet points for services to make them easy to read.
- Fallback: If you don't know an answer, say: "That's a great question! For specific technical details, I recommend speaking with our lead engineers directly. Would you like me to guide you to our contact page?"`;

/**
 * POST /chat
 * Calls Google Gemini AI to generate assistant responses
 */
router.post(
  "/",
  validateChatData,
  asyncHandler(async (req, res) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new AppError(
        "AI service is not configured. Please contact support.",
        503
      );
    }

    const { messages } = req.body;

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: SYSTEM_PROMPT,
      });

      // Build history (all except last message)
      const history = messages.slice(0, -1).map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      }));

      // Last message is the current user input
      const lastMessage = messages[messages.length - 1];

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(lastMessage.content);
      const reply = result.response.text();

      res.json({ reply });
    } catch (error) {
      if (error.status === 429) {
        throw new AppError("AI service is busy. Please try again in a moment.", 429);
      } else if (error.status === 400) {
        throw new AppError("Invalid request to AI service.", 400);
      } else {
        throw new AppError(
          error.message || "Failed to generate AI response",
          500
        );
      }
    }
  })
);

module.exports = router;

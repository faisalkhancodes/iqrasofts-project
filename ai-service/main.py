import os
from typing import Any

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from pydantic import BaseModel

load_dotenv()

SYSTEM_PROMPT = """Identity: You are the official AI Assistant for IqraSoft, a professional software house and digital services venture. Your goal is to be helpful, professional, and technically savvy.

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
- Fallback: If you don't know an answer, say: "That's a great question! For specific technical details, I recommend speaking with our lead engineers directly. Would you like me to guide you to our contact page?"
"""

app = FastAPI(title="IqraSoft AI Service")
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage] = []


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/chat")
def chat(body: ChatRequest) -> dict[str, Any]:
    if not os.environ.get("OPENAI_API_KEY"):
        raise HTTPException(
            status_code=503,
            detail="API Key not configured. Set OPENAI_API_KEY.",
        )

    user_messages = [m.model_dump() for m in body.messages]
    if not user_messages:
        return {
            "reply": "Hello! I am the IqraSoft AI Assistant. How can I help you today?"
        }

    openai_messages: list[dict[str, str]] = [
        {"role": "system", "content": SYSTEM_PROMPT},
        *user_messages,
    ]

    try:
        client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
        completion = client.chat.completions.create(
            model=os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
            messages=openai_messages,
            temperature=0.7,
            max_tokens=500,
        )
        bot_reply = completion.choices[0].message.content or ""
        return {"reply": bot_reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e

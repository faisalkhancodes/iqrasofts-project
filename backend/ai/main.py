import os
import logging
from typing import Any

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI, APIError
from pydantic import BaseModel, Field, validator

load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """Identity: You are the official AI Assistant for Iqrasofts, a professional software house and digital services venture. Your goal is to be helpful, professional, and technically savvy.

Core Services to Mention:
- Web Development: Frontend (React, HTML, CSS), WordPress, and full CMS solutions.
- Cybersecurity: Security monitoring, phishing prevention, and web application security.
- UI/UX Design: Professional designs using Figma and Canva.
- Digital Solutions: Custom software, SQL databases, and Arduino-based projects.

Tone & Personality:
- Be professional yet approachable.
- Act as a knowledgeable consultant for potential clients.
- If a user asks about a project, highlight that Iqrasofts delivers "premium, high-quality digital experiences."

Behavioral Rules:
- Lead Generation: If a user shows interest in a service, politely ask for their name and what kind of project they are looking for.
- Professionalism: Do not answer questions unrelated to software, technology, or business.
- Call to Action: Encourage users to "Get a Quote" or "Book a Consultation."
- Language: Respond in a clear and concise manner. Use bullet points for services to make them easy to read.
- Fallback: If you don't know an answer, say: "That's a great question! For specific technical details, I recommend speaking with our lead engineers directly. Would you like me to guide you to our contact page?"
"""

app = FastAPI(title="Iqrasofts AI Service")

# CORS middleware configuration
origins = os.getenv("CORS_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatMessage(BaseModel):
    role: str = Field(..., description="Message role: user, assistant, or system")
    content: str = Field(..., description="Message content")

    @validator("role")
    def validate_role(cls, v):
        if v not in ["user", "assistant", "system"]:
            raise ValueError("Role must be 'user', 'assistant', or 'system'")
        return v

    @validator("content")
    def validate_content(cls, v):
        if not v or not v.strip():
            raise ValueError("Content cannot be empty")
        if len(v) > 2000:
            raise ValueError("Content exceeds maximum length (2000 characters)")
        return v.strip()


class ChatRequest(BaseModel):
    messages: list[ChatMessage] = Field(default_factory=list, description="List of chat messages")

    @validator("messages")
    def validate_messages(cls, v):
        if not v:
            raise ValueError("At least one message is required")
        if len(v) > 50:
            raise ValueError("Too many messages in conversation")
        return v


@app.get("/health", tags=["Health"])
def health() -> dict[str, str]:
    """Health check endpoint"""
    return {
        "status": "ok",
        "service": "Iqrasofts AI Service",
    }


@app.post("/chat", tags=["Chat"], response_model=dict[str, str])
async def chat(body: ChatRequest) -> dict[str, str]:
    """
    Process chat messages and return AI response
    
    Args:
        body: ChatRequest containing message history
        
    Returns:
        Dictionary with 'reply' containing the AI's response
    """
    # Verify API key is configured
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        logger.error("OPENAI_API_KEY not configured")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI service is not properly configured. Please contact support.",
        )

    # If empty history, return greeting
    if not body.messages:
        return {
            "reply": "Hello! I am the Iqrasofts AI Assistant. How can I help you today?"
        }

    try:
        logger.info(f"Processing {len(body.messages)} messages from user")

        # Build messages for OpenAI
        openai_messages: list[dict[str, str]] = [
            {"role": "system", "content": SYSTEM_PROMPT},
            *[msg.model_dump() for msg in body.messages],
        ]

        # Initialize OpenAI client
        client = OpenAI(api_key=api_key)

        # Call OpenAI API
        model = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
        logger.info(f"Calling OpenAI API with model: {model}")

        completion = client.chat.completions.create(
            model=model,
            messages=openai_messages,
            temperature=0.7,
            max_tokens=500,
        )

        # Extract response
        bot_reply = completion.choices[0].message.content or ""
        
        if not bot_reply:
            logger.warning("OpenAI returned empty response")
            bot_reply = "I'm sorry, I couldn't generate a response. Please try again."

        logger.info("Successfully generated AI response")
        return {"reply": bot_reply}

    except APIError as e:
        logger.error(f"OpenAI API error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"OpenAI API error: {str(e)}",
        ) from e
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred. Please try again later.",
        ) from e

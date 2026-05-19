import logging
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ─────────────────────────────────────────────────────────────────────────────
# IqraSofts AI Engine powered by Google Gemini
# Uses API key from environment variable for dynamic, intelligent responses
# ─────────────────────────────────────────────────────────────────────────────

# Initialize Gemini client
api_key = os.getenv("GEMINI_API_KEY")
model_name = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")

if not api_key:
    logger.warning("⚠️ GEMINI_API_KEY not found in environment variables. Please set it in your .env file.")
else:
    genai.configure(api_key=api_key)

# System prompt for the AI assistant
SYSTEM_PROMPT = """You are an intelligent AI assistant for IqraSofts, a professional software house and digital services company based in Islamabad, Pakistan.

**About IqraSofts:**
- Web Development (React, HTML/CSS, WordPress, full-stack)
- Shopify & E-commerce Solutions
- Cybersecurity Services
- UI/UX Design (Figma, branding, mockups)
- Mobile App Development (React Native, Flutter)
- Website Maintenance & Support

**Contact Information:**
- Email: iqrasofttechnologies@gmail.com
- WhatsApp: 0371 5316610
- Website: iqrasofts.com
- Location: Islamabad, Pakistan
- Hours: Mon–Sat, 9:00 AM – 7:00 PM (PKT)

Always be helpful, professional, and recommend contacting the team for detailed quotes and consultations. Use emojis to make responses engaging."""


def generate_reply(user_message: str) -> str:
    """Generate AI response using Google Gemini API."""
    try:
        model = genai.GenerativeModel(
            model_name=model_name,
            system_instruction=SYSTEM_PROMPT
        )
        
        response = model.generate_content(user_message)
        return response.text
    except ValueError as e:
        logger.error(f"API Error: {str(e)}")
        return "❌ **Error:** Invalid API key or model configuration. Please check your GEMINI_API_KEY and GEMINI_MODEL in the .env file."
    except Exception as e:
        logger.error(f"Error calling Gemini API: {str(e)}")
        return f"🤔 An error occurred while processing your request. Please try again.\n\n**Contact us directly:**\n📧 iqrasofttechnologies@gmail.com\n💬 WhatsApp: 0371 5316610"


# ─────────────────────────────────────────────────────────────────────────────
# FastAPI Models and Configuration
# ─────────────────────────────────────────────────────────────────────────────

app = FastAPI(
    title="IqraSofts AI Service",
    description="AI chat engine powered by Google Gemini API",
    version="4.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
    messages: list[ChatMessage] = Field(default_factory=list)

    @validator("messages")
    def validate_messages(cls, v):
        if not v:
            raise ValueError("At least one message is required")
        return v


@app.get("/health", tags=["Health"])
def health():
    """Health check endpoint"""
    return {
        "status": "ok" if api_key else "error",
        "service": "IqraSofts AI Service",
        "engine": "Google Gemini API",
        "model": model_name,
        "message": "API key is configured" if api_key else "API key not found - set GEMINI_API_KEY in .env file",
    }


@app.post("/chat", tags=["Chat"])
async def chat(body: ChatRequest):
    """Process chat messages and return AI response using Google Gemini API."""
    last_message = body.messages[-1]
    logger.info(f"Chat request: '{last_message.content[:50]}...'")
    
    if not api_key:
        return {
            "reply": "❌ **Error:** Google Gemini API key is not configured. Please set GEMINI_API_KEY in your .env file.",
            "error": True
        }
    
    reply = generate_reply(last_message.content)
    return {"reply": reply}

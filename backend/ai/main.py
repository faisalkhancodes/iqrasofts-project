import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ─────────────────────────────────────────────────────────────────────────────
# IqraSofts Self-Contained AI Engine (Python / FastAPI)
# No external API key — fully rule-based, always available.
# ─────────────────────────────────────────────────────────────────────────────

KNOWLEDGE_BASE = [
    {
        "patterns": ["hi", "hello", "hey", "salaam", "salam", "assalam", "good morning", "good afternoon", "good evening", "howdy", "greetings"],
        "response": """👋 Hello! Welcome to **IqraSofts**! I'm your AI assistant.

Here's what I can help you with:
- 💻 **Web Development** (React, WordPress, HTML/CSS)
- 🛡️ **Cybersecurity** solutions
- 🎨 **UI/UX Design**
- 📱 **Mobile App Development**
- 🛒 **Shopify Store Setup**
- 🔧 **Website Maintenance**

What can I help you with today? 😊""",
        "priority": 10,
    },
    {
        "patterns": ["who are you", "what is iqrasofts", "about iqrasofts", "about you", "tell me about", "what do you do", "what does iqrasofts do", "company info"],
        "response": """🏢 **About IqraSofts**

IqraSofts is a professional **software house and digital services company** based in **Islamabad, Pakistan**.

**What We Deliver:**
- ✅ Premium, scalable web applications
- ✅ Cybersecurity solutions
- ✅ Beautiful UI/UX designs
- ✅ Mobile-first responsive platforms

**Why Choose Us?**
- 🎯 Client-centric approach
- 🔄 Agile development methodology
- 🕐 24/7 support & maintenance
- 🏆 Proven track record

📩 **[Get a free consultation →](https://iqrasofts.com/contact)**""",
        "priority": 9,
    },
    {
        "patterns": ["web development", "website", "web design", "react", "html", "css", "frontend", "landing page", "build website", "create website"],
        "response": """💻 **Web Development Services**

**Our Web Stack:**
- ⚛️ React.js — Dynamic, fast SPAs
- 🌐 HTML5 / CSS3 / JavaScript
- 📝 WordPress — Flexible CMS
- 🛒 Shopify — E-commerce stores
- 🔗 Full-Stack — React + Node.js + MongoDB

**What You Get:**
- ✅ Fully responsive (mobile-first)
- ✅ SEO optimized
- ✅ Fast load times
- ✅ Post-launch support

💬 Tell me about your project! What kind of website are you looking for?""",
        "priority": 9,
    },
    {
        "patterns": ["shopify", "ecommerce", "e-commerce", "online store", "sell online", "dropshipping"],
        "response": """🛒 **Shopify & E-Commerce Solutions**

**We Set Up:**
- ✅ Complete Shopify store
- ✅ Custom theme design & branding
- ✅ Payment gateway integration
- ✅ Inventory management
- ✅ SEO for product pages
- ✅ Mobile-optimized shopping

📩 **[Get a quote today! →](https://iqrasofts.com/contact)**""",
        "priority": 8,
    },
    {
        "patterns": ["cybersecurity", "cyber security", "security", "hacking", "phishing", "hacked", "malware", "vulnerability", "ssl", "protection"],
        "response": """🛡️ **Cybersecurity Services**

**Our Security Services:**
- 🔍 Website Security Audit
- 🚫 Phishing Prevention
- 🔒 Web Application Security
- 📊 Security Monitoring 24/7
- 🛠️ Malware Removal
- 🔐 SSL/TLS Setup

**Certifications:**
- ✅ Google Cybersecurity Professional Certificate
- ✅ Certified Phishing Prevention Specialist (CPPS)

📩 **[Book a consultation →](https://iqrasofts.com/contact)**""",
        "priority": 9,
    },
    {
        "patterns": ["ui ux", "ui/ux", "design", "figma", "canva", "graphic design", "logo", "branding", "mockup", "user interface"],
        "response": """🎨 **UI/UX Design Services**

**Design Services:**
- 🖼️ UI Design — Pixel-perfect interfaces in Figma
- 🔄 UX Design — User flows & prototyping
- 🎯 Brand Identity — Logos & color palettes
- 📱 Mobile UI — iOS & Android guidelines
- 📊 Dashboard Design

**Tools:** Figma, Adobe XD, Canva Pro

📩 **[Start your design project →](https://iqrasofts.com/contact)**""",
        "priority": 8,
    },
    {
        "patterns": ["mobile app", "android", "ios", "flutter", "react native", "app development", "mobile application"],
        "response": """📱 **Mobile App Development**

**Technologies:**
- ⚛️ React Native — Cross-platform (iOS + Android)
- 🐦 Flutter — Beautiful native experiences
- 🤖 Native Android (Java/Kotlin)
- 🍎 Native iOS (Swift)

**App Types:**
- 🛒 E-commerce apps
- 🍕 Food delivery apps
- 📅 Booking & appointment apps
- 💬 Social & community apps

📩 Have an app idea? Tell me and I'll get the team in touch!""",
        "priority": 8,
    },
    {
        "patterns": ["price", "pricing", "cost", "how much", "rate", "budget", "quote", "estimate", "package", "affordable"],
        "response": """💰 **Pricing & Packages**

| Service | Starting From |
|---------|-------------|
| Landing Page | PKR 15,000+ |
| Business Website | PKR 30,000+ |
| WordPress Site | PKR 25,000+ |
| Shopify Store | PKR 35,000+ |
| Mobile App | PKR 80,000+ |
| Security Audit | PKR 20,000+ |

Every project is unique — we provide **free custom quotes**!

📩 **[Get your free quote →](https://iqrasofts.com/contact)**
💬 WhatsApp: **0371 5316610**""",
        "priority": 9,
    },
    {
        "patterns": ["contact", "reach", "email", "phone", "whatsapp", "call", "talk to", "location", "address", "islamabad", "get in touch"],
        "response": """📞 **Contact IqraSofts**

📍 **Location:** Islamabad, Pakistan
📧 **Email:** iqrasofttechnologies@gmail.com
💬 **WhatsApp:** 0371 5316610
🌐 **Website:** iqrasofts.com
🕐 **Hours:** Mon–Sat, 9:00 AM – 7:00 PM (PKT)

📋 **[Contact Form →](https://iqrasofts.com/contact)**""",
        "priority": 9,
    },
    {
        "patterns": ["portfolio", "projects", "previous work", "examples", "showcase", "past projects", "demo"],
        "response": """🗂️ **IqraSofts Portfolio**

🛒 **Iqra Luxe eCommerce** — Next.js premium e-commerce
📜 **Quote Generator** — Dynamic JS app with API integration
🎮 **Tic-Tac-Toe Game** — Interactive two-player game
🏢 **IqraSofts Website** — Our own React + Vite site
🔢 **Modern Web Calculator** — Clean, functional calculator

Visit **[iqrasofts.com/projects](https://iqrasofts.com/projects)** for the full portfolio!""",
        "priority": 8,
    },
    {
        "patterns": ["team", "who works", "developers", "founder", "ceo", "faisal", "engineers", "staff"],
        "response": """👥 **Meet the IqraSofts Team**

👨‍💼 **Engr Faisal Khan** — Founder & CEO
🤖 **M. Hamza** — AI/ML Engineer
🌐 **M. Aizaz** — Senior Web Developer
🎨 **Rubab Bukhari** — Graphic Designer
🔒 **Habib Ullah** — Cyber Security Expert

🔗 **[Meet the full team →](https://iqrasofts.com/team)**""",
        "priority": 8,
    },
    {
        "patterns": ["services", "what services", "what do you offer", "offerings", "capabilities"],
        "response": """🚀 **IqraSofts Services**

| Service | Description |
|---------|-------------|
| 💻 Web Development | React, HTML/CSS, JS, full-stack |
| 📝 WordPress | Themes, WooCommerce, CMS |
| 🛒 Shopify | Complete store setup |
| 🎨 UI/UX Design | Figma designs, branding |
| 📱 Mobile Apps | React Native, Flutter |
| 🛡️ Cybersecurity | Audits, monitoring |
| 🔧 Maintenance | Updates, backups, support |

Which service are you interested in? 😊""",
        "priority": 9,
    },
    {
        "patterns": ["how long", "timeline", "deadline", "duration", "turnaround", "delivery time"],
        "response": """⏱️ **Project Timelines**

| Project Type | Estimated Timeline |
|-------------|-------------------|
| Landing Page | 3–5 days |
| Business Website | 1–2 weeks |
| WordPress Site | 1–2 weeks |
| E-commerce Store | 2–4 weeks |
| Mobile App (MVP) | 4–8 weeks |
| Security Audit | 3–7 days |

✅ Urgent delivery available! 📩 **[Contact us →](https://iqrasofts.com/contact)**""",
        "priority": 7,
    },
    {
        "patterns": ["how does it work", "process", "how do you work", "workflow", "steps", "how to start", "get started"],
        "response": """📋 **How IqraSofts Works**

1. 🔍 **Discovery** — Free consultation
2. 📐 **Strategy** — Roadmap & tech stack
3. 🎨 **Design** — UI/UX mockups for approval
4. 💻 **Development** — Agile, with progress updates
5. 🧪 **Testing** — QA across devices & browsers
6. 🚀 **Launch** — Smooth deployment
7. 🔧 **Support** — Ongoing maintenance

📩 **[Book a free consultation →](https://iqrasofts.com/contact)**""",
        "priority": 8,
    },
    {
        "patterns": ["bye", "goodbye", "see you", "later", "thanks", "thank you", "ok", "okay", "got it", "great", "perfect", "awesome"],
        "response": """😊 Thank you for connecting with **IqraSofts**!

We're always here when you need us!

📧 iqrasofttechnologies@gmail.com
💬 WhatsApp: 0371 5316610
🌐 iqrasofts.com

Have a wonderful day! 🌟""",
        "priority": 6,
    },
]


def generate_reply(user_message: str) -> str:
    """Smart rule-based response engine with priority scoring."""
    text = user_message.lower().strip()
    best_match = None
    highest_score = 0

    for entry in KNOWLEDGE_BASE:
        score = 0
        for pattern in entry["patterns"]:
            if pattern in text:
                score += len(pattern) + entry.get("priority", 1)
        if score > highest_score:
            highest_score = score
            best_match = entry

    if best_match and highest_score > 0:
        return best_match["response"]

    return """🤔 Great question! For a detailed answer, please reach out directly:

📧 **Email:** iqrasofttechnologies@gmail.com
💬 **WhatsApp:** 0371 5316610
📋 **Contact Form:** [iqrasofts.com/contact](https://iqrasofts.com/contact)

I can also help you with:
- 💻 Web & mobile development
- 🛡️ Cybersecurity services
- 🎨 UI/UX design
- 💰 Pricing & packages

What would you like to know? 😊"""


# ─────────────────────────────────────────────────────────────────────────────
# FastAPI App
# ─────────────────────────────────────────────────────────────────────────────

app = FastAPI(
    title="IqraSofts AI Service",
    description="Self-contained AI chat engine — no external API key required",
    version="2.0.0",
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
        "status": "ok",
        "service": "IqraSofts AI Service",
        "engine": "self-contained rule-based",
    }


@app.post("/chat", tags=["Chat"])
async def chat(body: ChatRequest):
    """Process chat messages and return AI response — no API key needed."""
    last_message = body.messages[-1]
    logger.info(f"Chat request: '{last_message.content[:50]}...'")
    reply = generate_reply(last_message.content)
    return {"reply": reply}

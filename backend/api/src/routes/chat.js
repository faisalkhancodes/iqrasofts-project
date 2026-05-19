const express = require("express");
const { validateChatData } = require("../middleware/validation");
const { asyncHandler } = require("../middleware/errorHandler");

const router = express.Router();

// ─────────────────────────────────────────────────────────────────────────────
// IqraSofts Rule-Based AI Engine
// No external API needed — fully self-contained, always available.
// ─────────────────────────────────────────────────────────────────────────────

const KNOWLEDGE_BASE = [
  // ── GREETINGS ──────────────────────────────────────────────────────────────
  {
    patterns: ["hi", "hello", "hey", "salaam", "assalam", "salam", "good morning", "good afternoon", "good evening", "howdy", "greetings"],
    response: `👋 Hello! Welcome to **IqraSofts**! I'm your AI assistant, here to help you with anything related to our services.

Here's what I can help you with:
- 💻 **Web Development** (React, WordPress, HTML/CSS)
- 🛡️ **Cybersecurity** solutions
- 🎨 **UI/UX Design**
- 📱 **Mobile App Development**
- 🛒 **Shopify Store Setup**
- 🔧 **Website Maintenance**

What can I help you with today? 😊`,
    priority: 10,
  },

  // ── ABOUT IQRASOFTS ────────────────────────────────────────────────────────
  {
    patterns: ["who are you", "what is iqrasofts", "about iqrasofts", "about you", "tell me about", "what do you do", "what does iqrasofts do", "company info", "about company"],
    response: `🏢 **About IqraSofts**

IqraSofts is a professional **software house and digital services company** based in **Islamabad, Pakistan**.

We are more than just developers — we are your **partners in digital growth**. Founded with a vision to bridge the gap between complex technology and real business needs.

**What We Deliver:**
- ✅ Premium, scalable web applications
- ✅ Cybersecurity solutions
- ✅ Beautiful UI/UX designs
- ✅ Mobile-first responsive platforms

**Why Choose Us?**
- 🎯 Client-centric approach
- 🔄 Agile development methodology
- 🕐 24/7 support & maintenance
- 🏆 Proven track record of excellence

Ready to build something amazing together? **[Get a free consultation today!](https://iqrasofts.com/contact)**`,
    priority: 9,
  },

  // ── WEB DEVELOPMENT ────────────────────────────────────────────────────────
  {
    patterns: ["web development", "website", "web design", "react", "html", "css", "frontend", "front-end", "landing page", "build website", "make website", "create website", "website development"],
    response: `💻 **Web Development Services**

We craft **stunning, high-performance websites** that convert visitors into customers.

**Our Web Stack:**
- ⚛️ **React.js** — Dynamic, fast SPAs
- 🌐 **HTML5 / CSS3 / JavaScript** — Clean, standards-compliant code
- 📝 **WordPress** — Flexible CMS solutions
- 🛒 **Shopify** — E-commerce stores
- 🔗 **Full-Stack** — React + Node.js + MongoDB

**What You Get:**
- ✅ Fully responsive (mobile-first)
- ✅ SEO optimized
- ✅ Fast load times
- ✅ Modern, professional design
- ✅ Post-launch support

**Portfolio Highlights:**
- 🏪 Iqra Luxe eCommerce (Next.js)
- 🔮 IqraSofts Official Website
- 📜 Quote Generator App

💬 Tell me about your project and I'll connect you with the right team! What kind of website are you looking for?`,
    priority: 9,
  },

  // ── WORDPRESS ──────────────────────────────────────────────────────────────
  {
    patterns: ["wordpress", "cms", "blog website", "content management", "woocommerce"],
    response: `📝 **WordPress Development**

We build powerful, easy-to-manage **WordPress websites** tailored to your needs.

**Our WordPress Services:**
- 🎨 Custom theme development
- 🔌 Plugin development & integration
- 🛒 WooCommerce e-commerce setup
- ⚡ Speed optimization
- 🔒 Security hardening
- 📱 Mobile responsive design

**Perfect for:**
- Business websites
- Blogs & news portals
- Online stores
- Portfolio sites
- Membership platforms

Prices start from competitive rates. 📩 **Contact us for a free quote!** Visit [iqrasofts.com/contact](https://iqrasofts.com/contact)`,
    priority: 8,
  },

  // ── SHOPIFY ────────────────────────────────────────────────────────────────
  {
    patterns: ["shopify", "ecommerce", "e-commerce", "online store", "online shop", "sell online", "dropshipping"],
    response: `🛒 **Shopify & E-Commerce Solutions**

Launch your **dream online store** with IqraSofts!

**We Set Up:**
- ✅ Complete Shopify store setup
- ✅ Custom theme design & branding
- ✅ Product catalog configuration
- ✅ Payment gateway integration
- ✅ Inventory management
- ✅ SEO for product pages
- ✅ Mobile-optimized shopping experience

**Why Shopify?**
- No technical knowledge needed to manage
- Secure, reliable hosting included
- 100+ payment providers supported
- Built-in analytics

🚀 We've built premium e-commerce platforms like **Iqra Luxe** — a fully responsive store with advanced filtering and checkout.

📩 Ready to start selling online? **[Get a quote today!](https://iqrasofts.com/contact)**`,
    priority: 8,
  },

  // ── CYBERSECURITY ──────────────────────────────────────────────────────────
  {
    patterns: ["cybersecurity", "cyber security", "security", "hacking", "phishing", "hacked", "website hacked", "malware", "vulnerability", "ssl", "protection", "secure website", "cpps"],
    response: `🛡️ **Cybersecurity Services**

Protect your **digital assets** with IqraSofts' cybersecurity expertise.

**Our Security Services:**
- 🔍 **Website Security Audit** — Find vulnerabilities before hackers do
- 🚫 **Phishing Prevention** — Protect your team & users
- 🔒 **Web Application Security** — Secure your apps & APIs
- 📊 **Security Monitoring** — 24/7 threat detection
- 🛠️ **Malware Removal** — Clean & restore hacked websites
- 🔐 **SSL/TLS Setup** — Encrypted, trusted connections

**Certifications:**
- ✅ Google Cybersecurity Professional Certificate
- ✅ Certified Phishing Prevention Specialist (CPPS)
- ✅ Information Security Certified

⚠️ **Already been hacked?** Our team can help restore your website and secure it against future attacks.

📩 **[Book an emergency consultation](https://iqrasofts.com/contact)**`,
    priority: 9,
  },

  // ── UI/UX DESIGN ───────────────────────────────────────────────────────────
  {
    patterns: ["ui ux", "ui/ux", "design", "figma", "canva", "graphic design", "logo", "branding", "mockup", "prototype", "user interface", "user experience", "app design"],
    response: `🎨 **UI/UX Design Services**

We create **beautiful, intuitive designs** that users love and that drive conversions.

**Design Services:**
- 🖼️ **UI Design** — Pixel-perfect interfaces in Figma
- 🔄 **UX Design** — User flows, wireframes & prototyping
- 🎯 **Brand Identity** — Logos, color palettes, typography
- 📱 **Mobile UI** — iOS & Android design guidelines
- 🌐 **Web Design** — Responsive layouts
- 📊 **Dashboard Design** — Data visualization & admin panels

**Our Design Process:**
1. 🔍 Research & discovery
2. ✏️ Wireframing
3. 🎨 Visual design
4. 🔄 Prototyping & iteration
5. ✅ Handoff to developers

**Tools:** Figma, Adobe XD, Canva Pro, Adobe Illustrator

💡 Good design isn't just visual — it's the **experience**. Let's create something your users will love!

📩 **[Start your design project](https://iqrasofts.com/contact)**`,
    priority: 8,
  },

  // ── MOBILE APP ─────────────────────────────────────────────────────────────
  {
    patterns: ["mobile app", "android", "ios", "flutter", "react native", "app development", "smartphone app", "mobile application"],
    response: `📱 **Mobile App Development**

Build powerful **iOS & Android apps** that your users will love!

**Technologies We Use:**
- ⚛️ **React Native** — Cross-platform (iOS + Android from one codebase)
- 🐦 **Flutter** — Beautiful, fast native experiences
- 🤖 **Android (Java/Kotlin)** — Native Android
- 🍎 **iOS (Swift)** — Native iOS

**App Types We Build:**
- 🛒 E-commerce apps
- 🍕 Food delivery apps
- 📅 Booking & appointment apps
- 💬 Social & community apps
- 📊 Business dashboard apps
- 🎮 Games & entertainment

**Our Process:**
✅ Requirements analysis → ✅ UI/UX Design → ✅ Development → ✅ Testing → ✅ App Store submission

📩 Have an app idea? **Tell me about it** and I'll get our mobile team in touch with you!`,
    priority: 8,
  },

  // ── PRICING / QUOTE ────────────────────────────────────────────────────────
  {
    patterns: ["price", "pricing", "cost", "how much", "rate", "budget", "quote", "estimate", "package", "cheap", "affordable", "expensive"],
    response: `💰 **Pricing & Packages**

At IqraSofts, we offer **competitive, transparent pricing** tailored to your project needs.

**Pricing depends on:**
- 📋 Project complexity & scope
- ⏱️ Timeline & urgency
- 🛠️ Technologies required
- 🔄 Ongoing support needs

**General Ranges:**
| Service | Starting From |
|---------|-------------|
| Landing Page | PKR 15,000+ |
| Business Website | PKR 30,000+ |
| WordPress Site | PKR 25,000+ |
| Shopify Store | PKR 35,000+ |
| Mobile App | PKR 80,000+ |
| Security Audit | PKR 20,000+ |

💡 **Every project is unique!** We provide **free consultations** and detailed quotes based on your exact requirements.

📩 **[Get your free custom quote →](https://iqrasofts.com/contact)**

Or WhatsApp us directly: **0371 5316610**`,
    priority: 9,
  },

  // ── CONTACT ────────────────────────────────────────────────────────────────
  {
    patterns: ["contact", "reach", "email", "phone", "whatsapp", "call", "talk to", "speak to", "meet", "location", "address", "islamabad", "get in touch", "how to contact"],
    response: `📞 **Contact IqraSofts**

We'd love to hear about your project! Here's how to reach us:

📍 **Location:** Islamabad, Pakistan

📧 **Email:** [iqrasofttechnologies@gmail.com](mailto:iqrasofttechnologies@gmail.com)

💬 **WhatsApp:** [0371 5316610](https://wa.me/923715316610)

🌐 **Website:** [iqrasofts.com](https://iqrasofts.com)

📱 **Facebook:** [IqraSofts](https://www.facebook.com/share/1CxVfo9Qvm/)

💼 **LinkedIn:** [IqraSofts](https://www.linkedin.com/company/iqrasoftscom/)

🕐 **Business Hours:** Mon–Sat, 9:00 AM – 7:00 PM (PKT)

Or use the **[Contact Form →](https://iqrasofts.com/contact)** and our team will get back to you within 24 hours!`,
    priority: 9,
  },

  // ── PORTFOLIO / PROJECTS ───────────────────────────────────────────────────
  {
    patterns: ["portfolio", "projects", "previous work", "work", "examples", "showcase", "case study", "what have you built", "your work", "past projects", "demo"],
    response: `🗂️ **IqraSofts Portfolio**

Here are some of our recent projects:

🛒 **Iqra Luxe eCommerce**
Next.js premium e-commerce platform with advanced filtering & checkout
[Live Demo](https://iqraluxe.netlify.app/) | [GitHub](https://github.com/faisalkhancodes/ecommerce-devhub-project)

📜 **Quote Generator App**
Dynamic JavaScript app with API integration & social sharing
[Live Demo](https://iquotegenerater.netlify.app/) | [GitHub](https://github.com/faisalkhancodes/quote-generator)

🎮 **Tic-Tac-Toe Game**
Interactive two-player game with modern UI
[Play Now](https://tic-tac-toe-gamei.netlify.app/)

🏢 **IqraSofts Official Website**
Our own React + Vite website you're on right now!
[Live](https://iqrasofts.com)

🔢 **Modern Web Calculator**
Clean, functional calculator with keyboard support
[Open](https://samplecalculatori.netlify.app/)

Want to see more? Visit **[iqrasofts.com/projects](https://iqrasofts.com/projects)** for the full portfolio!`,
    priority: 8,
  },

  // ── TEAM ───────────────────────────────────────────────────────────────────
  {
    patterns: ["team", "who works", "developers", "employees", "staff", "founder", "ceo", "faisal", "engineers"],
    response: `👥 **Meet the IqraSofts Team**

We're a talented group of passionate tech professionals:

👨‍💼 **Engr Faisal Khan** — Founder & CEO
Full-stack developer, cybersecurity expert & visionary leader

🤖 **M. Hamza** — AI/ML Engineer
Specialist in artificial intelligence & machine learning solutions

🌐 **M. Aizaz** — Senior Web Developer
Expert in React, Node.js, and modern web technologies

🎨 **Rubab Bukhari** — Graphic Designer
UI/UX designer specializing in Figma & brand identity

🔒 **Habib Ullah** — Cyber Security Expert
Certified security professional protecting digital assets

...and more talented engineers joining our growing team!

🔗 **[Meet the full team →](https://iqrasofts.com/team)**`,
    priority: 8,
  },

  // ── SERVICES OVERVIEW ──────────────────────────────────────────────────────
  {
    patterns: ["services", "what services", "what do you offer", "offerings", "what can you do", "capabilities"],
    response: `🚀 **IqraSofts Services**

We offer comprehensive digital solutions:

| Service | Description |
|---------|-------------|
| 💻 **Web Development** | React, HTML/CSS, JS, full-stack |
| 📝 **WordPress** | Custom themes, WooCommerce, CMS |
| 🛒 **Shopify** | Complete store setup & management |
| 🎨 **UI/UX Design** | Figma designs, branding, prototypes |
| 📱 **Mobile Apps** | React Native, Flutter, iOS & Android |
| 🛡️ **Cybersecurity** | Audits, monitoring, phishing prevention |
| 🔧 **Maintenance** | Updates, backups, performance tuning |

Which service are you most interested in? I can give you detailed information and pricing for any of these! 😊`,
    priority: 9,
  },

  // ── MAINTENANCE ────────────────────────────────────────────────────────────
  {
    patterns: ["maintenance", "update website", "fix website", "website broken", "bug fix", "support", "ongoing support", "monthly support"],
    response: `🔧 **Website Maintenance & Support**

Keep your website **running smoothly** with IqraSofts maintenance plans!

**What's Included:**
- 🔄 Regular CMS & plugin updates
- 💾 Automated daily backups
- ⚡ Performance optimization
- 🐛 Bug fixes & troubleshooting
- 🔒 Security monitoring & patches
- 📊 Monthly performance reports
- 📞 Priority support response

**Plans Available:**
- 🥉 Basic — Security updates & backups
- 🥈 Standard — Full maintenance + small changes
- 🥇 Premium — Unlimited changes + 24/7 support

📩 **[Get a maintenance plan →](https://iqrasofts.com/contact)**`,
    priority: 7,
  },

  // ── PROCESS / HOW IT WORKS ─────────────────────────────────────────────────
  {
    patterns: ["how does it work", "process", "how do you work", "workflow", "steps", "how to start", "get started", "begin"],
    response: `📋 **How IqraSofts Works**

Our streamlined process gets your project done right, on time:

**Step 1: 🔍 Discovery**
Free consultation to understand your goals, requirements, and vision.

**Step 2: 📐 Strategy**
We design the perfect roadmap, architecture, and technology stack for your project.

**Step 3: 🎨 Design**
UI/UX mockups and prototypes created for your approval before development begins.

**Step 4: 💻 Execution**
High-quality development using agile methodology with regular progress updates.

**Step 5: 🧪 Testing**
Rigorous QA testing across devices, browsers, and performance benchmarks.

**Step 6: 🚀 Launch**
Smooth deployment with zero downtime, domain setup, and go-live support.

**Step 7: 🔧 Support**
Ongoing maintenance, updates, and feature additions as your business grows.

📩 **Ready to start? [Book a free consultation →](https://iqrasofts.com/contact)**`,
    priority: 8,
  },

  // ── TIMELINE / HOW LONG ────────────────────────────────────────────────────
  {
    patterns: ["how long", "timeline", "deadline", "duration", "turnaround", "time to build", "delivery time", "when will"],
    response: `⏱️ **Project Timelines**

Delivery times depend on project complexity:

| Project Type | Estimated Timeline |
|-------------|-------------------|
| Landing Page | 3–5 days |
| Business Website | 1–2 weeks |
| WordPress Site | 1–2 weeks |
| E-commerce Store | 2–4 weeks |
| Mobile App (MVP) | 4–8 weeks |
| Custom Web App | 4–12 weeks |
| Security Audit | 3–7 days |

✅ We work with **your deadlines** — urgent delivery available for critical projects.

📩 Tell us your timeline and we'll make it work! **[Contact us →](https://iqrasofts.com/contact)**`,
    priority: 7,
  },

  // ── TECHNOLOGIES ───────────────────────────────────────────────────────────
  {
    patterns: ["technology", "tech stack", "programming language", "framework", "node", "nodejs", "mongodb", "javascript", "python", "next.js", "nextjs", "vite"],
    response: `⚙️ **Technologies We Use**

**Frontend:**
- ⚛️ React.js / Next.js / Vite
- 🎨 HTML5, CSS3, Tailwind CSS
- 📜 JavaScript (ES2024), TypeScript

**Backend:**
- 🟢 Node.js + Express.js
- 🐍 Python + FastAPI
- 🔌 REST APIs & GraphQL

**Databases:**
- 🍃 MongoDB + Mongoose
- 🐘 PostgreSQL / MySQL
- 🔥 Firebase / Supabase

**Mobile:**
- ⚛️ React Native
- 🐦 Flutter

**DevOps & Cloud:**
- ▲ Vercel, Netlify
- ☁️ AWS, DigitalOcean
- 🐙 GitHub Actions (CI/CD)

**Design:**
- 🎨 Figma, Adobe XD, Canva Pro

What tech stack are you looking to use for your project?`,
    priority: 7,
  },

  // ── SEO / DIGITAL MARKETING ────────────────────────────────────────────────
  {
    patterns: ["seo", "search engine", "google ranking", "digital marketing", "traffic", "rank on google", "marketing"],
    response: `📈 **SEO & Digital Presence**

Get found on Google with IqraSofts' SEO-optimized development!

**SEO Built Into Every Website:**
- ✅ Semantic HTML structure
- ✅ Fast load times (Core Web Vitals)
- ✅ Mobile-first responsive design
- ✅ Meta tags & Open Graph optimization
- ✅ Schema markup & structured data
- ✅ Sitemap & robots.txt configuration
- ✅ Image optimization & lazy loading

**Additional SEO Services:**
- 🔍 Keyword research & strategy
- 📝 SEO-optimized content writing
- 🔗 Technical SEO audits
- 📊 Monthly SEO reporting

A fast, well-structured website is the **foundation of good SEO**. We build websites that search engines love!

📩 **[Let's boost your online presence →](https://iqrasofts.com/contact)**`,
    priority: 7,
  },

  // ── GOODBYE ────────────────────────────────────────────────────────────────
  {
    patterns: ["bye", "goodbye", "see you", "later", "thanks", "thank you", "ok", "okay", "got it", "sure", "great", "perfect", "awesome"],
    response: `😊 Thank you for connecting with **IqraSofts**!

We're always here when you need us. Don't hesitate to reach out anytime!

📧 iqrasofttechnologies@gmail.com
💬 WhatsApp: [0371 5316610](https://wa.me/923715316610)
🌐 [iqrasofts.com](https://iqrasofts.com)

Have a wonderful day! 🌟`,
    priority: 6,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Smart response engine
// ─────────────────────────────────────────────────────────────────────────────

function generateReply(userMessage) {
  const input = userMessage.toLowerCase().trim();

  let bestMatch = null;
  let highestScore = 0;

  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;
    for (const pattern of entry.patterns) {
      if (input.includes(pattern)) {
        // Longer pattern matches score higher
        score += pattern.length + (entry.priority || 1);
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && highestScore > 0) {
    return bestMatch.response;
  }

  // ── Default fallback ──────────────────────────────────────────────────────
  return `🤔 Great question! That's a bit specific, but I'd love to help.

For detailed answers tailored to your needs, please reach out to our expert team directly:

📧 **Email:** [iqrasofttechnologies@gmail.com](mailto:iqrasofttechnologies@gmail.com)
💬 **WhatsApp:** [0371 5316610](https://wa.me/923715316610)
📋 **Contact Form:** [iqrasofts.com/contact](https://iqrasofts.com/contact)

In the meantime, here's what I **can** help you with:
- 💻 Web & mobile development
- 🛡️ Cybersecurity services
- 🎨 UI/UX design
- 💰 Pricing & packages
- 👥 Our team & process

What would you like to know about any of these? 😊`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Route handler
// ─────────────────────────────────────────────────────────────────────────────

router.post(
  "/",
  validateChatData,
  asyncHandler(async (req, res) => {
    const { messages } = req.body;
    const lastMessage = messages[messages.length - 1];
    const reply = generateReply(lastMessage.content);
    res.json({ reply });
  })
);

module.exports = router;

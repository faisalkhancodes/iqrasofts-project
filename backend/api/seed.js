require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const mongoose = require("mongoose");
const Contact = require("./src/models/Contact");
const Project = require("./src/models/Project");
const BlogPost = require("./src/models/BlogPost");

const MONGODB_URI = process.env.MONGODB_URI;

// ─── PROJECTS DATA ────────────────────────────────────────────────────────────
const projects = [
  {
    slug: "quote-generator",
    title: "Quote Generator",
    category: "web",
    categoryLabel: "Web Application / Productivity",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    imageAlt: "Quote Generator",
    description: "A dynamic quote engine that delivers curated inspiration. It features real-time DOM updates, seamless social sharing, and a responsive, high-performance interface.",
    tags: ["JavaScript", "API Integration", "UI/UX Design"],
    liveDemo: "https://iquotegenerater.netlify.app/",
    github: "https://github.com/faisalkhancodes/quote-generator",
    order: 1,
  },
  {
    slug: "iqra-luxe-ecommerce",
    title: "Iqra Luxe eCommerce",
    category: "web",
    categoryLabel: "E-commerce / Premium",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2064&auto=format&fit=crop&w=800&q=80",
    imageAlt: "Iqra Luxe eCommerce",
    description: "A premium, fully responsive eCommerce platform featuring advanced product filtering, shopping cart management, and a seamless checkout experience.",
    tags: ["Next.js", "E-commerce", "Responsive"],
    liveDemo: "https://iqraluxe.netlify.app/",
    github: "https://github.com/faisalkhancodes/ecommerce-devhub-project",
    order: 2,
  },
  {
    slug: "iqrasofts-official-website",
    title: "IqraSofts Official Website",
    category: "web",
    categoryLabel: "Software House Web",
    image: "https://images.unsplash.com/photo-1460925895917-adf4e565e6b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    imageAlt: "IqraSofts Official Website",
    description: "Built using modern web technologies, this website demonstrates professional web design, responsive layout, and interactive user experience. It highlights our services and serves as our official online presence.",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive"],
    liveDemo: "https://IqraSofts.com",
    github: "https://github.com/faisalkhancodes/iqrasofts-project",
    order: 3,
  },
  {
    slug: "tic-tac-toe-game",
    title: "Tic-Tac-Toe Game",
    category: "game",
    categoryLabel: "Gaming / Web App",
    image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    imageAlt: "Tic-Tac-Toe Game",
    description: "A sleek, interactive Tic-Tac-Toe game built with pure Vanilla JavaScript. Allows two players to compete with real-time win detection and a modern UI.",
    tags: ["Vanilla JS", "HTML/CSS", "Game Logic"],
    liveDemo: "https://tic-tac-toe-gamei.netlify.app/",
    github: "https://github.com/faisalkhancodes/Tic-tac-Toe--game",
    order: 4,
  },
  {
    slug: "modern-web-calculator",
    title: "Modern Web Calculator",
    category: "app",
    categoryLabel: "Utilities / JS",
    image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    imageAlt: "Simple Calculator",
    description: "A responsive web calculator that performs addition, subtraction, multiplication, and division. Perfect for quick calculations with a clean user interface.",
    tags: ["JavaScript", "HTML/CSS"],
    liveDemo: "https://samplecalculatori.netlify.app/",
    github: "https://github.com/faisalkhancodes/Simple-Calculator",
    order: 5,
  },
];

// ─── BLOG POSTS DATA ──────────────────────────────────────────────────────────
const blogPosts = [
  {
    slug: "web-dev-trends-2026",
    title: "10 Web Development Trends to Watch in 2026",
    category: "web development",
    categoryLabel: "Web Development",
    tags: "javascript, cloud",
    date: "March 1, 2026",
    excerpt: "Explore the latest trends shaping the web development landscape, from AI-driven coding to serverless architectures.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    imageAlt: "Modern Web Development",
    authorName: "Engr Faisal Khan",
    authorRole: "CEO & Founder",
    authorImg: "/pictures/faisal.jpeg",
    published: true,
    order: 1,
  },
  {
    slug: "native-vs-cross-platform",
    title: "Native vs Cross-Platform: Making the Right Choice",
    category: "mobile apps",
    categoryLabel: "Mobile Apps",
    tags: "mobile",
    date: "February 25, 2026",
    excerpt: "Deep dive into the performance and cost-efficiency of Native, Flutter, and React Native for your next project.",
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    imageAlt: "Mobile App Development",
    authorName: "M. Hamza",
    authorRole: "AI/ML Engineer",
    authorImg: "/pictures/Hamza AI.png",
    published: true,
    order: 2,
  },
  {
    slug: "psychology-of-color-in-web-design",
    title: "The Psychology of Color in Web Design",
    category: "design",
    categoryLabel: "Design",
    tags: "ui/ux",
    date: "February 20, 2026",
    excerpt: "Discover how color theories impact user emotions and brand perception in high-end digital interfaces.",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    imageAlt: "Color Psychology in Design",
    authorName: "Rubab Bukhari",
    authorRole: "Graphic Designer",
    authorImg: "/pictures/Rubab.png",
    published: true,
    order: 3,
  },
  {
    slug: "essential-security-practices",
    title: "Essential Security Practices for Modern Websites",
    category: "web development",
    categoryLabel: "Security",
    tags: "security",
    date: "February 15, 2026",
    excerpt: "Key security measures every website owner should implement to protect against cyber threats in 2026.",
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    imageAlt: "Cyber Security",
    authorName: "Habib Ullah",
    authorRole: "Cyber Security Expert",
    authorImg: "/pictures/Habib Cyber S.jpeg",
    published: true,
    order: 4,
  },
  {
    slug: "maximizing-ecommerce-conversions",
    title: "Maximizing Conversions in E-commerce Store",
    category: "business",
    categoryLabel: "Business",
    tags: "e-commerce",
    date: "February 10, 2026",
    excerpt: "Learn the proven strategies to turn visitors into loyal customers in the competitive digital market.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    imageAlt: "E-commerce Business",
    authorName: "Engr Faisal Khan",
    authorRole: "CEO & Founder",
    authorImg: "/pictures/faisal.jpeg",
    published: true,
    order: 5,
  },
  {
    slug: "integrating-ai-into-business",
    title: "Integrating AI into your Business Workflow",
    category: "technology",
    categoryLabel: "Technology",
    tags: "ai",
    date: "February 5, 2026",
    excerpt: "How artificial intelligence is revolutionizing productivity and customer experiences in 2026.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    imageAlt: "AI in Development",
    authorName: "M. Hamza",
    authorRole: "AI/ML Engineer",
    authorImg: "/pictures/Hamza AI.png",
    published: true,
    order: 6,
  },
  {
    slug: "minimalist-ui-ux-design",
    title: "The Art of Minimalist UI/UX Design",
    category: "design",
    categoryLabel: "Design",
    tags: "ui/ux",
    date: "January 28, 2026",
    excerpt: "Less is more: why minimalist design continues to dominate the premium software market.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    imageAlt: "Minimalist Design",
    authorName: "Rubab Bukhari",
    authorRole: "Graphic Designer",
    authorImg: "/pictures/Rubab.png",
    published: true,
    order: 7,
  },
  {
    slug: "cybersecurity-for-scaleups",
    title: "Cybersecurity Strategies for Scale-ups",
    category: "business",
    categoryLabel: "Business",
    tags: "security",
    date: "January 20, 2026",
    excerpt: "Protecting your brand and data as you grow in an increasingly complex digital landscape.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    imageAlt: "Business Technology",
    authorName: "Habib Ullah",
    authorRole: "Cyber Security Expert",
    authorImg: "/pictures/Habib Cyber S.jpeg",
    published: true,
    order: 8,
  },
  {
    slug: "optimizing-core-web-vitals",
    title: "Optimizing Web Performance for Core Web Vitals",
    category: "web development",
    categoryLabel: "Web Development",
    tags: "seo",
    date: "January 15, 2026",
    excerpt: "A technical guide to achieving perfect lighthouse scores and superior user speed.",
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    imageAlt: "Web Performance",
    authorName: "M. Aizaz",
    authorRole: "Senior Web Developer",
    authorImg: "/pictures/Aizaz WD.jpeg",
    published: true,
    order: 9,
  },
];

// ─── SAMPLE CONTACTS ──────────────────────────────────────────────────────────
const sampleContacts = [
  { name: "Ahmed Raza", email: "ahmed.raza@gmail.com", subject: "Web Development Inquiry", message: "Hello IqraSofts team! I'm looking to build a professional e-commerce website for my clothing brand. I'd love to get a quote and discuss the project details." },
  { name: "Sarah Khan", email: "sarah.khan@outlook.com", subject: "Mobile App Development", message: "Hi, I have a startup idea for a food delivery app targeting Islamabad. I need a team to develop both iOS and Android versions. Can we schedule a consultation?" },
  { name: "Bilal Ahmed", email: "bilal.ahmed@hotmail.com", subject: "WordPress Website", message: "I need a WordPress website for my consultancy firm with a blog, services page, and contact form. Looking forward to hearing from you." },
  { name: "Fatima Malik", email: "fatima.malik@yahoo.com", subject: "UI/UX Design Project", message: "We are a startup that needs UI/UX design for our SaaS product. We have wireframes ready and need professional Figma designs." },
  { name: "Usman Tariq", email: "usman.tariq@gmail.com", subject: "Cybersecurity Audit", message: "Our company website was recently compromised. We need a cybersecurity expert to audit our systems and fix vulnerabilities. Urgent." },
  { name: "Hina Siddiqui", email: "hina.siddiqui@gmail.com", subject: "Digital Marketing Website", message: "I need a modern landing page for my digital marketing agency — responsive, fast, and SEO-optimized." },
  { name: "Zain ul Abideen", email: "zain.dev@protonmail.com", subject: "Partnership Inquiry", message: "I visited your website and I'm impressed! I'm interested in a potential long-term partnership. Could someone reach out?" },
];

// ─── SEED FUNCTION ────────────────────────────────────────────────────────────
async function seed() {
  try {
    if (!MONGODB_URI) {
      console.error("❌ MONGODB_URI not found in .env file");
      process.exit(1);
    }

    console.log("🔌 Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected!\n");

    // --- Contacts ---
    await Contact.deleteMany({});
    const contacts = await Contact.insertMany(sampleContacts);
    console.log(`📬 Contacts seeded: ${contacts.length}`);

    // --- Projects ---
    await Project.deleteMany({});
    const insertedProjects = await Project.insertMany(projects);
    console.log(`🗂️  Projects seeded: ${insertedProjects.length}`);
    insertedProjects.forEach((p, i) => console.log(`   ${i + 1}. ${p.title}`));

    // --- Blog Posts ---
    await BlogPost.deleteMany({});
    const insertedPosts = await BlogPost.insertMany(blogPosts);
    console.log(`\n📝 Blog posts seeded: ${insertedPosts.length}`);
    insertedPosts.forEach((p, i) => console.log(`   ${i + 1}. ${p.title}`));

    console.log("\n🎉 All collections seeded successfully!");
  } catch (err) {
    console.error("❌ Seed error:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected.");
  }
}

seed();

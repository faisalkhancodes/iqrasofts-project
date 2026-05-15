import { useMemo, useState } from "react";
import { BLOG_POSTS } from "../data/blogPosts.js";

const CATEGORIES = [
  { label: "All Posts", slug: "all posts" },
  { label: "Web Development", slug: "web development" },
  { label: "Mobile Apps", slug: "mobile apps" },
  { label: "Design", slug: "design" },
  { label: "Technology", slug: "technology" },
  { label: "Business", slug: "business" },
];

const TAGS = [
  "JavaScript",
  "React",
  "UI/UX",
  "SEO",
  "Mobile",
  "AI",
  "Cloud",
  "Security",
];

export default function Blog() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all posts");

  const visiblePosts = useMemo(() => {
    const term = search.toLowerCase().trim();
    return BLOG_POSTS.filter((p) => {
      const title = p.title.toLowerCase();
      const tags = p.tags.toLowerCase();
      const matchesSearch =
        !term || title.includes(term) || tags.includes(term);
      const matchesCat =
        activeCategory === "all posts" || p.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [search, activeCategory]);

  return (
    <>
      <section className="page-hero reveal">
        <div className="container">
          <div className="page-hero-content">
            <h1>Blog & Insights</h1>
            <p>Latest tech trends, tips, and company updates</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="blog-container">
            <div className="blog-sidebar">
              <div className="sidebar-widget reveal">
                <h3>Search</h3>
                <div className="search-box">
                  <input
                    type="text"
                    id="blogSearch"
                    placeholder="Search posts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <i className="fas fa-search" />
                </div>
              </div>

              <div className="sidebar-widget reveal">
                <h3>Categories</h3>
                <ul className="category-list">
                  {CATEGORIES.map(({ label, slug }) => (
                    <li key={slug}>
                      <a
                        href="#"
                        className={activeCategory === slug ? "active" : ""}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveCategory(slug);
                        }}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sidebar-widget reveal">
                <h3>Popular Tags</h3>
                <div className="tag-cloud">
                  {TAGS.map((tag) => (
                    <a
                      href="#"
                      key={tag}
                      className="tag"
                      onClick={(e) => {
                        e.preventDefault();
                        setSearch(tag);
                      }}
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </div>

              <div className="sidebar-widget reveal">
                <h3>Recent Posts</h3>
                <ul className="recent-posts">
                  <li>
                    <a href="#">10 Web Development Trends for 2026</a>
                    <span className="post-date">March 1, 2026</span>
                  </li>
                  <li>
                    <a href="#">How to Choose the Right Mobile App Framework</a>
                    <span className="post-date">February 25, 2026</span>
                  </li>
                  <li>
                    <a href="#">UI/UX Best Practices for Modern Websites</a>
                    <span className="post-date">February 20, 2026</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="blog-main">
              <div className="blog-grid">
                {visiblePosts.map((p) => (
                  <article
                    key={p.slug}
                    className="blog-post reveal active"
                    data-category={p.category}
                    data-tags={p.tags}
                  >
                    <div className="post-image">
                      <img src={p.image} alt={p.imageAlt} />
                    </div>
                    <div className="post-content">
                      <div className="post-meta">
                        <span className="post-category">{p.categoryLabel}</span>
                        <span className="post-date">{p.date}</span>
                      </div>
                      <h2>
                        <a
                          href="#"
                          onClick={(e) => e.preventDefault()}
                        >
                          {p.title}
                        </a>
                      </h2>
                      <p>{p.excerpt}</p>
                      <div className="post-author">
                        <img src={p.authorImg} alt="Author" />
                        <div className="author-info">
                          <span className="author-name">{p.authorName}</span>
                          <span className="author-role">{p.authorRole}</span>
                        </div>
                      </div>
                      <a
                        href="#"
                        className="read-more"
                        onClick={(e) => e.preventDefault()}
                      >
                        Read More <i className="fas fa-arrow-right" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>

              <div className="pagination">
                <button type="button" className="pagination-btn" disabled>
                  <i className="fas fa-chevron-left" />
                </button>
                <button type="button" className="pagination-btn active">
                  1
                </button>
                <button type="button" className="pagination-btn">
                  2
                </button>
                <button type="button" className="pagination-btn">
                  3
                </button>
                <button type="button" className="pagination-btn">
                  <i className="fas fa-chevron-right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray">
        <div className="container">
          <div className="newsletter-content reveal">
            <h2>Stay Updated</h2>
            <p>
              Subscribe to our newsletter for the latest tech insights and company
              updates
            </p>
            <form
              className="newsletter-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert(
                  "Thank you! Your message has been sent successfully."
                );
                e.currentTarget.reset();
              }}
            >
              <input type="email" placeholder="Enter your email" required />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

import { useEffect, useMemo, useState } from "react";
import { fetchBlogPosts } from "../utils/api.js";
import { BLOG_POSTS as FALLBACK_POSTS } from "../data/blogPosts.js";

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
  const [posts, setPosts] = useState(FALLBACK_POSTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts()
      .then((res) => {
        if (res?.data?.length) setPosts(res.data);
      })
      .catch(() => {
        // Keep fallback static data on error
      })
      .finally(() => setLoading(false));
  }, []);

  const visiblePosts = useMemo(() => {
    const term = search.toLowerCase().trim();
    return posts.filter((p) => {
      const title = p.title.toLowerCase();
      const tags = (p.tags || "").toLowerCase();
      const matchesSearch =
        !term || title.includes(term) || tags.includes(term);
      const matchesCat =
        activeCategory === "all posts" || p.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [search, activeCategory, posts]);

  return (
    <>
      <section className="page-hero reveal">
        <div className="container">
          <div className="page-hero-content">
            <h1>Blog &amp; Insights</h1>
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
                  {posts.slice(0, 3).map((p) => (
                    <li key={p.slug}>
                      <a href="#">{p.title}</a>
                      <span className="post-date">{p.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="blog-main">
              {loading ? (
                <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-light)" }}>
                  <i className="fas fa-spinner fa-spin" style={{ fontSize: "2rem" }} />
                  <p style={{ marginTop: "1rem" }}>Loading posts...</p>
                </div>
              ) : (
                <div className="blog-grid">
                  {visiblePosts.length === 0 ? (
                    <p style={{ color: "var(--text-light)" }}>No posts found.</p>
                  ) : (
                    visiblePosts.map((p) => (
                      <article
                        key={p.slug}
                        className="blog-post reveal active"
                        data-category={p.category}
                        data-tags={p.tags}
                      >
                        <div className="post-image">
                          <img src={p.image} alt={p.imageAlt || p.title} />
                        </div>
                        <div className="post-content">
                          <div className="post-meta">
                            <span className="post-category">{p.categoryLabel}</span>
                            <span className="post-date">{p.date}</span>
                          </div>
                          <h2>
                            <a href="#" onClick={(e) => e.preventDefault()}>
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
                    ))
                  )}
                </div>
              )}

              <div className="pagination">
                <button type="button" className="pagination-btn" disabled>
                  <i className="fas fa-chevron-left" />
                </button>
                <button type="button" className="pagination-btn active">1</button>
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
                alert("Thank you for subscribing!");
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

export default function Blog() {
  const posts = [
    {
      title: "Why we pair React with Node and MongoDB",
      category: "engineering",
      tags: "fullstack mongodb",
    },
    {
      title: "Adding a Python AI microservice without blocking your API",
      category: "ai",
      tags: "python openai",
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="section-header reveal active">
          <h2>Blog</h2>
          <p>Notes from our build pipeline and client work.</p>
        </div>
        <div className="blog-list">
          {posts.map((p) => (
            <article
              key={p.title}
              className="blog-post reveal active"
              data-category={p.category}
              data-tags={p.tags}
            >
              <h2>{p.title}</h2>
              <p className="blog-meta">
                <span className="tag">{p.category}</span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

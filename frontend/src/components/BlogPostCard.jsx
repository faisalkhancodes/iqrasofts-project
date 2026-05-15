import { Link } from "react-router-dom";

export default function BlogPostCard({ post }) {
  return (
    <article className="blog-post reveal">
      <div className="post-image">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="post-content">
        <div className="post-meta">
          <span className="post-category">{post.categoryLabel}</span>
          <span className="post-date">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <h3>
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="post-excerpt">{post.excerpt}</p>
        
        <div className="post-author">
          <img src={post.authorImg} alt={post.authorName} className="author-avatar" />
          <div className="author-info">
            <p className="author-name">{post.authorName}</p>
            <p className="author-role">{post.authorRole}</p>
          </div>
        </div>

        <Link to={`/blog/${post.slug}`} className="read-more">
          Read More →
        </Link>
      </div>
    </article>
  );
}

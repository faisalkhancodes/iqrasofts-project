export default function ProjectCard({ project }) {
  return (
    <div className="portfolio-card reveal" data-category={project.category}>
      <div className="project-image">
        <img src={project.image} alt={project.title} />
        <div className="project-overlay">
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="view-project-btn"
          >
            Live Demo
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="view-project-btn"
            style={{ marginLeft: "10px" }}
          >
            GitHub
          </a>
        </div>
      </div>
      <div className="project-info">
        <span className="project-category">{project.categoryLabel}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag, idx) => (
            <span key={idx}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

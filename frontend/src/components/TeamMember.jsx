export default function TeamMember({ member }) {
  if (member.featured) {
    return (
      <div className="service-card team-card founder-card-prominent">
        <div className="team-img-container">
          <img src={member.image} alt={member.name} className="team-img" />
        </div>
        <h2 className="team-name">{member.name}</h2>
        <p className="team-role text-primary">{member.role}</p>
        <p className="team-desc">{member.bio}</p>
        {member.achievements && (
          <ul className="member-achievements">
            {member.achievements.map((achievement, idx) => (
              <li key={idx}>{achievement}</li>
            ))}
          </ul>
        )}
        <a href={member.portfolio} target="_blank" rel="noopener noreferrer" className="founder-btn">
          View Portfolio
          <i className="fas fa-arrow-right"></i>
        </a>
      </div>
    );
  }

  return (
    <div className="team-member reveal">
      <div className="member-image">
        <img src={member.image} alt={member.name} />
      </div>
      <div className="member-info">
        <h3>{member.name}</h3>
        <p className="member-role">{member.role}</p>
        <p className="member-bio">{member.bio}</p>
        
        {member.skills && (
          <div className="member-skills">
            {member.skills.map((skill, idx) => (
              <span key={idx} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        )}

        {(member.projects || member.clients) && (
          <div className="member-stats">
            {member.projects && <span>{member.projects} Projects</span>}
            {member.clients && <span>{member.clients} Clients</span>}
          </div>
        )}
      </div>
    </div>
  );
}

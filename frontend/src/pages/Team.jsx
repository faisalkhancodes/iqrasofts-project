import { Link } from "react-router-dom";
import "./team-responsive.css";

export default function Team() {
  return (
    <>
      <section className="page-hero reveal">
        <div className="container">
          <div className="page-hero-content">
            <h1>Meet Our Amazing Team</h1>
            <h4>
              Talented professionals dedicated to bringing your digital dreams to
              life{" "}
            </h4>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header reveal">
            <h2>Our Leadership</h2>
            <h4>
              Visionary leaders driving our mission forward with innovation and
              expertise
            </h4>
          </div>

          <div className="team-leadership">
            <div className="team-member featured reveal">
              <div className="member-image">
                <img src="/pictures/faisal.jpeg" alt="Engr Faisal Khan" />
                <div className="member-social">
                  <a
                    href="https://ifaisalkhancodes.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-globe" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/faisal-khan-123456"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin" />
                  </a>
                </div>
              </div>
              <div className="member-info">
                <h3>Engr Faisal Khan</h3>
                <p className="member-role">Founder & CEO</p>
                <p className="member-bio">
                  Leading the vision of Iqrasofts to deliver excellence in digital
                  solutions. With extensive experience in software engineering,
                  business strategy, and team leadership, Faisal brings innovation
                  and technical expertise to every project.
                </p>
                <div className="member-expertise">
                  <h4>Expertise:</h4>
                  <div className="member-skills">
                    <span className="skill-tag">Strategic Planning</span>
                    <span className="skill-tag">Software Architecture</span>
                    <span className="skill-tag">Team Leadership</span>
                    <span className="skill-tag">Business Development</span>
                    <span className="skill-tag">Project Management</span>
                  </div>
                </div>
                <div className="member-achievements">
                  <h4>Achievements:</h4>
                  <ul>
                    <li>7+ years in software development</li>
                    <li>Led 50+ successful projects</li>
                    <li>Expert in multiple programming languages</li>
                    <li>Strong business acumen and client relations</li>
                  </ul>
                </div>
                <a
                  href="https://ifaisalkhancodes.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  View Portfolio
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray">
        <div className="container">
          <div className="section-header">
            <h2>Development Experts</h2>
            <p>
              Skilled developers building cutting-edge solutions with modern
              technologies
            </p>
          </div>

          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img src="/pictures/Aizaz WD.jpeg" alt="M. Aizaz" />
              </div>
              <div className="member-info">
                <h3>M. Aizaz</h3>
                <p className="member-role">Senior Web Developer</p>
                <p className="member-bio">
                  BS Software Engineering from BUI. Specializing in frontend
                  development with expertise in modern JavaScript frameworks and
                  responsive design.
                </p>
                <div className="member-skills">
                  <span className="skill-tag">HTML/CSS</span>
                  <span className="skill-tag">JavaScript</span>
                  <span className="skill-tag">React</span>
                  <span className="skill-tag">Vue.js</span>
                  <span className="skill-tag">Tailwind CSS</span>
                </div>
                <div className="member-stats">
                  <span>
                    <i className="fas fa-project-diagram" /> 20+ Projects
                  </span>
                  <span>
                    <i className="fas fa-clock" /> 3 Years Experience
                  </span>
                </div>
              </div>
            </div>

            <div className="team-member reveal">
              <div className="member-image">
                <img src="/pictures/Bilal.png" alt="Bilal Khan" />
              </div>
              <div className="member-info">
                <h3>Bilal Khan</h3>
                <p className="member-role">Full Stack Developer</p>
                <p className="member-bio">
                  BS Computer Science from University of Swat. Expert in both
                  frontend and backend development with strong database management
                  skills.
                </p>
                <div className="member-skills">
                  <span className="skill-tag">Node.js</span>
                  <span className="skill-tag">MongoDB</span>
                  <span className="skill-tag">PHP</span>
                  <span className="skill-tag">MySQL</span>
                  <span className="skill-tag">Express.js</span>
                </div>
                <div className="member-stats">
                  <span>
                    <i className="fas fa-project-diagram" /> 25+ Projects
                  </span>
                  <span>
                    <i className="fas fa-clock" /> 2 Years Experience
                  </span>
                </div>
              </div>
            </div>

            <div className="team-member reveal">
              <div className="member-image">
                <img src="/pictures/Sharafat.jpeg" alt="Sharafat Ullah" />
              </div>
              <div className="member-info">
                <h3>Sharafat Ullah</h3>
                <p className="member-role">Backend Developer</p>
                <p className="member-bio">
                  BS Software Engineering from BUI. Specializing in server-side
                  development and API design with focus on performance and security.
                </p>
                <div className="member-skills">
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">Django</span>
                  <span className="skill-tag">PostgreSQL</span>
                  <span className="skill-tag">REST APIs</span>
                  <span className="skill-tag">Docker</span>
                </div>
                <div className="member-stats">
                  <span>
                    <i className="fas fa-project-diagram" /> 18+ Projects
                  </span>
                  <span>
                    <i className="fas fa-clock" /> 3 Years Experience
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Specialized Experts</h2>
            <p>Domain specialists bringing unique expertise to our projects</p>
          </div>

          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img src="/pictures/Hamza AI.png" alt="M. Hamza" />
              </div>
              <div className="member-info">
                <h3>M. Hamza</h3>
                <p className="member-role">AI/ML Engineer</p>
                <p className="member-bio">
                  BS Software Engineering from BUI. Passionate about artificial
                  intelligence and machine learning with expertise in developing
                  intelligent solutions.
                </p>
                <div className="member-skills">
                  <span className="skill-tag">Machine Learning</span>
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">TensorFlow</span>
                  <span className="skill-tag">PyTorch</span>
                  <span className="skill-tag">Data Science</span>
                </div>
                <div className="member-stats">
                  <span>
                    <i className="fas fa-project-diagram" /> 10+ AI Projects
                  </span>
                  <span>
                    <i className="fas fa-clock" /> 2 Years Experience
                  </span>
                </div>
              </div>
            </div>

            <div className="team-member">
              <div className="member-image">
                <img src="/pictures/Habib Cyber S.jpeg" alt="Habib Ullah" />
              </div>
              <div className="member-info">
                <h3>Habib Ullah</h3>
                <p className="member-role">Cyber Security Expert</p>
                <p className="member-bio">
                  BS Cyber Security from IIUI. Specialized in identifying
                  vulnerabilities and implementing robust security measures for
                  digital assets.
                </p>
                <div className="member-skills">
                  <span className="skill-tag">Security Audit</span>
                  <span className="skill-tag">Penetration Testing</span>
                  <span className="skill-tag">Risk Assessment</span>
                  <span className="skill-tag">Ethical Hacking</span>
                  <span className="skill-tag">Compliance</span>
                </div>
                <div className="member-stats">
                  <span>
                    <i className="fas fa-shield-alt" /> 30+ Security Audits
                  </span>
                  <span>
                    <i className="fas fa-clock" /> 1 Years Experience
                  </span>
                </div>
              </div>
            </div>

            <div className="team-member">
              <div className="member-image">
                <img src="/pictures/Rubab.png" alt="Rubab Bukhari" />
              </div>
              <div className="member-info">
                <h3>Rubab Bukhari</h3>
                <p className="member-role">Senior Graphic Designer</p>
                <p className="member-bio">
                  BBIT from Virtual University. Creative designer with expertise in
                  brand identity, UI/UX design, and digital marketing materials.
                </p>
                <div className="member-skills">
                  <span className="skill-tag">Adobe Creative Suite</span>
                  <span className="skill-tag">UI Design</span>
                  <span className="skill-tag">Branding</span>
                  <span className="skill-tag">Figma</span>
                  <span className="skill-tag">Motion Graphics</span>
                </div>
                <div className="member-stats">
                  <span>
                    <i className="fas fa-palette" /> 40+ Design Projects
                  </span>
                  <span>
                    <i className="fas fa-clock" /> 4 Years Experience
                  </span>
                </div>
              </div>
            </div>

            <div className="team-member">
              <div className="member-image">
                <img src="/pictures/Azlan.jpeg" alt="Azlan Zafar" />
              </div>
              <div className="member-info">
                <h3>Azlan Zafar</h3>
                <p className="member-role">Video Editing Expert</p>
                <p className="member-bio">
                  Expert in video editing and production with skills in creating
                  engaging visual content for marketing and training purposes.
                </p>
                <div className="member-skills">
                  <span className="skill-tag">Video Editing</span>
                  <span className="skill-tag">Motion Graphics</span>
                  <span className="skill-tag">Color Grading</span>
                  <span className="skill-tag">After Effects</span>
                  <span className="skill-tag">Premiere Pro</span>
                </div>
                <div className="member-stats">
                  <span>
                    <i className="fas fa-video" /> 60+ Videos Edited
                  </span>
                  <span>
                    <i className="fas fa-clock" /> 2 Years Experience
                  </span>
                </div>
              </div>
            </div>

            <div className="team-member">
              <div className="member-image">
                <img src="/pictures/Kinza.jpeg" alt="Kinza" />
              </div>
              <div className="member-info">
                <h3>Kinza</h3>
                <p className="member-role">HR Manager</p>
                <p className="member-bio">
                  BS Psychology from BUI. Specialized in human resource management,
                  team building, and creating positive work environments.
                </p>
                <div className="member-skills">
                  <span className="skill-tag">Recruitment</span>
                  <span className="skill-tag">Team Management</span>
                  <span className="skill-tag">Employee Relations</span>
                  <span className="skill-tag">Training</span>
                  <span className="skill-tag">Performance Management</span>
                </div>
                <div className="member-stats">
                  <span>
                    <i className="fas fa-users" /> 15+ Team Members Managed
                  </span>
                  <span>
                    <i className="fas fa-clock" /> 3 Years Experience
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray">
        <div className="container">
          <div className="section-header">
            <h2>Join Our Growing Team</h2>
            <p>Values and principles that guide our work environment</p>
            <p>
              We&apos;re always looking for talented individuals who share our
              passion for innovation and excellence
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="join-team-content reveal">
            <div className="join-features">
              <div className="join-feature">
                <i className="fas fa-rocket" />
                <h3>Innovation</h3>
                <p>Work on cutting-edge projects with latest technologies</p>
              </div>
              <div className="join-feature">
                <i className="fas fa-users" />
                <h3>Great Team</h3>
                <p>Join a supportive and collaborative team environment</p>
              </div>
              <div className="join-feature">
                <i className="fas fa-graduation-cap" />
                <h3>Growth</h3>
                <p>Continuous learning opportunities and career advancement</p>
              </div>
              <div className="join-feature">
                <i className="fas fa-home" />
                <h3>Flexibility</h3>
                <p>Flexible work arrangements and work-life balance</p>
              </div>
            </div>

            <Link to="/contact" className="btn btn-primary">
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

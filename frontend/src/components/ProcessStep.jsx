export default function ProcessStep({ number, icon, title, description }) {
  return (
    <div className="process-step reveal">
      <div className="step-number">{number}</div>
      <div className="icon-box" style={{ margin: "0 auto 1.5rem" }}>
        <i className={icon}></i>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function ServiceCard({ icon, title }) {
  return (
    <div className="service-card reveal">
      <div className="icon-box">
        <i className={icon}></i>
      </div>
      <h3>{title}</h3>
    </div>
  );
}

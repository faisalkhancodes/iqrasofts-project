export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="section-header reveal">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}

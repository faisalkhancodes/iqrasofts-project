export default function PageHero({ title, subtitle }) {
  return (
    <section className="page-hero reveal">
      <div className="container">
        <div className="page-hero-content">
          <h1>{title}</h1>
          {subtitle && <h4>{subtitle}</h4>}
        </div>
      </div>
    </section>
  );
}

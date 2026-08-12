export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="shell not-found-inner">
        <span className="mini-label mini-label-light">404 / Off course</span>
        <h1>This page never made it aboard.</h1>
        <p>The link may be outdated, or the page may have moved.</p>
        <a className="button button-light" href="/">Back to The Ark <span>→</span></a>
      </div>
    </main>
  );
}

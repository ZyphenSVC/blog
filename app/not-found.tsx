import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="content-container page-content">
      <header className="page-heading">
        <p className="eyebrow">404 / Not found</p>
        <h1>This page does not exist.</h1>
        <p>The route may have moved, been archived, or never existed in the first place.</p>
      </header>
      <div className="intro-links">
        <Link href="/">Return home →</Link>
        <Link href="/blog">View blog →</Link>
      </div>
    </main>
  );
}

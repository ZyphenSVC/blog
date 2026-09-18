"use client";

export default function ThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement;
    const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = nextTheme;
    try {
      localStorage.setItem("portfolio-theme", nextTheme);
    } catch {
      // The toggle still works when the browser disables persistent storage.
    }
  }

  return (
    <button type="button" className="theme-toggle" onClick={toggleTheme}>
      <span className="theme-to-light">
        <span className="sr-only">Switch to light mode</span>
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.945 8c-1.139 0-2.377.129-3.395.491-2.283.828-2.791.838-5.102 0-1.016-.362-2.257-.491-3.393-.491-1.971 0-4.17.387-6.055.878v1.789c.848.255 1.068.627 1.203 1.493.381 2.443 1.256 4.84 5.068 4.84 3.037 0 4.051-2.259 4.723-4.345.34-1.06 1.662-1.087 2.008-.015.674 2.089 1.682 4.36 4.725 4.36 3.814 0 4.689-2.397 5.07-4.841.135-.866.355-1.237 1.203-1.493v-1.788C22.057 8.387 19.916 8 17.945 8z" />
        </svg>
      </span>
      <span className="theme-to-dark">
        <span className="sr-only">Switch to dark mode</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 1v3m0 16v3M1 12h3m16 0h3M4.2 4.2l2.1 2.1m11.4 11.4 2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
        </svg>
      </span>
    </button>
  );
}

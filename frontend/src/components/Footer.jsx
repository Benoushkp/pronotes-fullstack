import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text"> An Archdeacon Web Creation</p>
      <div className="social-links" role="list" aria-label="Social media links">
        <a
          href="https://github.com/your-github"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          role="listitem"
          className="social-link"
        >
          {/* GitHub SVG icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.17 3.36 9.57 8.03 11.13.59.1.8-.26.8-.58 0-.29-.01-1.05-.02-2.06-3.26.71-3.95-1.57-3.95-1.57-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.18.08 1.8 1.21 1.8 1.21 1.04 1.78 2.72 1.27 3.38.97.11-.75.41-1.27.75-1.56-2.6-.3-5.34-1.3-5.34-5.79 0-1.28.46-2.33 1.22-3.15-.12-.3-.53-1.52.11-3.16 0 0 .99-.32 3.25 1.22a11.3 11.3 0 012.96-.4c1 0 2.01.13 2.96.4 2.26-1.54 3.25-1.22 3.25-1.22.64 1.64.23 2.86.11 3.16.76.82 1.22 1.87 1.22 3.15 0 4.5-2.75 5.49-5.37 5.77.42.37.8 1.1.8 2.22 0 1.6-.01 2.89-.01 3.29 0 .32.2.7.8.58A11.53 11.53 0 0023.5 12c0-6.28-5.23-11.5-11.5-11.5z" />
          </svg>
        </a>

        <a
          href="https://linkedin.com/in/your-linkedin"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          role="listitem"
          className="social-link"
        >
          {/* LinkedIn SVG icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M4.98 3.5a2.5 2.5 0 11.001 5.001A2.5 2.5 0 014.98 3.5zM3 8.98h4v12H3v-12zm7 0h3.8v1.72h.05c.53-1 1.82-2.06 3.75-2.06 4 0 4.75 2.62 4.75 6.02V20h-4v-5.4c0-1.3-.02-2.97-1.8-2.97-1.8 0-2.07 1.4-2.07 2.86V20h-4v-12z" />
          </svg>
        </a>

        <a
          href="https://yourportfolio.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Portfolio"
          role="listitem"
          className="social-link"
        >
          {/* Portfolio icon: simple globe */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.91 7h-3.64c-.14-1.15-.5-2.2-1.05-3.16 1.79.84 3.17 2.36 4.09 4.16zm-3.94 6H18c-.92 1.8-2.3 3.32-4.09 4.16.55-.96.9-2.01 1.05-3.16zm-1.54-1h-3.84a6.9 6.9 0 01-.32-2.19c0-.78.13-1.53.32-2.19h3.84c.18.66.32 1.41.32 2.19 0 .78-.14 1.53-.32 2.19zM5.72 11H2.91c.92-1.8 2.3-3.32 4.09-4.16-.55.96-.9 2.01-1.05 3.16zm0 2h3.64c.14 1.15.5 2.2 1.05 3.16-1.79-.84-3.17-2.36-4.09-4.16zM12 4.5c.78 0 1.53.13 2.19.32v3.84c-.66-.18-1.41-.32-2.19-.32s-1.53.14-2.19.32V4.82c.66-.19 1.41-.32 2.19-.32z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}

import type { SVGProps } from "react";

const paths = {
  home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z" /></>,
  pen: <><path d="m16 3 5 5-12 12-6 1 1-6Z" /><path d="m14 5 5 5M4 15l5 5" /></>,
  book: <><path d="M12 5v16M3 3c4 0 6 0 9 2 3-2 5-2 9-2v16c-4 0-6 0-9 2-3-2-5-2-9-2Z" /></>,
  research: <><path d="M9 3h6M10 3v7l-6 9a1.3 1.3 0 0 0 1 2h14a1.3 1.3 0 0 0 1-2l-6-9V3M7 15h10" /></>,
  code: <><path d="m7 6-6 6 6 6m10-12 6 6-6 6M14 3l-4 18" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
  document: <><path d="M14 2H5v20h14V7Zm0 0v5h5M8 12h8M8 16h8" /></>,
  download: <><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" /></>,
  trophy: <><path d="M8 3h8v6a4 4 0 0 1-8 0ZM8 5H4v3a4 4 0 0 0 5 4m7-7h4v3a4 4 0 0 1-5 4M12 13v5m-4 3h8l-1-3H9Z" /></>,
  education: <><path d="m2 8 10-5 10 5-10 5Zm4 2v7c4 3 8 3 12 0v-7M22 8v8" /></>,
  users: <><circle cx="9" cy="7" r="3" /><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 4v3" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V3h8v4M3 12c6 3 12 3 18 0M10 13v3h4v-3" /></>,
  shield: <><path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6Zm-4 9 3 3 5-5" /></>,
  award: <><circle cx="12" cy="8" r="6" /><path d="m8 13-2 9 6-3 6 3-2-9" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></>,
  chat: <><path d="M4 4h16v13H9l-5 4ZM8 8h8M8 12h5" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 1v2m0 18v2M1 12h2m18 0h2M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2" /></>,
  moon: <><path d="M21 13A9 9 0 0 1 11 3a9 9 0 1 0 10 10Z" /></>,
  github: <><path d="M9 19c-4 1-4-2-6-2m13 5v-4a4 4 0 0 0-1-3c3 0 6-1 6-5a4 4 0 0 0-1-3 4 4 0 0 0 0-4s-1 0-4 2a13 13 0 0 0-8 0C5 3 4 3 4 3a4 4 0 0 0 0 4 4 4 0 0 0-1 3c0 4 3 5 6 5a4 4 0 0 0-1 3v4" /></>,
  linkedin: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 10v7M7 7h.01M11 17v-7m0 3a3 3 0 0 1 6 0v4" /></>,
};

export type IconName = keyof typeof paths;

export function Icon({ name, className = "", ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className={`icon ${className}`} {...props}>
      {paths[name]}
    </svg>
  );
}

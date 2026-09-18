import Link from "next/link";
import { Icon, type IconName } from "@/app/components/Icon";

const contactLinks: { label: string; value: string; href: string; icon: IconName }[] = [
  {
    label: "Discord",
    icon: "chat",
    value: "ZyphenSVC",
    href: "https://discord.com/",
  },
  {
    label: "Email",
    icon: "mail",
    value: "svedantam@zyphensvc.com",
    href: "mailto:svedantam@zyphensvc.com",
  },
  {
    label: "LinkedIn",
    icon: "linkedin",
    value: "linkedin.com/in/svedantam",
    href: "https://linkedin.com/in/svedantam",
  },
  {
    label: "GitHub",
    icon: "github",
    value: "github.com/ZyphenSVC",
    href: "https://github.com/ZyphenSVC",
  },
  {
    label: "Website",
    icon: "globe",
    value: "zyphensvc.com",
    href: "https://zyphensvc.com",
  },
];

export default function ContactPage() {
  return (
    <main id="main-content" className="reading-container page-content">
      <header className="page-heading">
        <h1 className="reveal-text">Let’s get in touch.</h1>
        <p>Reach out for research collaboration, technical writing, software engineering opportunities, cybersecurity work, or questions about my notes and projects.</p>
      </header>
      <div className="card-grid">
        {contactLinks.map((item) => (
          <a key={item.label} href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="surface-card detail-card">
            <h2 className="contact-heading"><Icon name={item.icon} />{item.label}</h2>
            <p className="contact-value">{item.value}</p>
          </a>
        ))}
      </div>
      <section className="documents surface-card">
        <h2>Documents</h2>
        <div className="intro-links">
          <Link href="/media/resume.pdf" target="_blank" rel="noopener noreferrer"><Icon name="download" />Resume</Link>
          <Link href="/media/cv.pdf" target="_blank" rel="noopener noreferrer"><Icon name="document" />Curriculum Vitae</Link>
        </div>
      </section>
    </main>
  );
}

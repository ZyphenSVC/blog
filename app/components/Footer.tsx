import { Icon } from "@/app/components/Icon";

export default function Footer() {
  return (
    <footer className="site-footer site-container">
      <div className="footer-links">
        <a href="https://github.com/ZyphenSVC"><Icon name="github" />GitHub</a>
        <a href="https://linkedin.com/in/svedantam"><Icon name="linkedin" />LinkedIn</a>
        <a href="mailto:svedantam@zyphensvc.com"><Icon name="mail" />Email</a>
      </div>
      <p>Copyright © {new Date().getFullYear()} Sriaditya Vedantam. Site source on <a href="https://github.com/ZyphenSVC/blog">GitHub</a>.</p>
    </footer>
  );
}

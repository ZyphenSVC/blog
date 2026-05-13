import Link from "next/link";
import Navbar from "@/app/components/Navbar";

const contactLinks = [
  {
    label: "Discord",
    value: "ZyphenSVC",
    href: "https://discord.com/",
  },
  {
    label: "Email",
    value: "svedantam@zyphensvc.com",
    href: "mailto:svedantam@zyphensvc.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/svedantam",
    href: "https://linkedin.com/in/svedantam",
  },
  {
    label: "GitHub",
    value: "github.com/ZyphenSVC",
    href: "https://github.com/ZyphenSVC",
  },
  {
    label: "Website",
    value: "zyphensvc.com",
    href: "https://zyphensvc.com",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#252324] text-[#EAE0D5]">
      <Navbar />

      <section className="mx-auto max-w-5xl px-8 py-16 lg:px-14">
        <header className="mb-14 border-b border-[#575253] pb-8">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#8C86AA]">
            Contact / Collaboration / Research
          </p>

          <h1 className="mt-4 font-mono text-4xl font-bold uppercase tracking-[0.18em] md:text-5xl">
            Contact
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#BEB6AD]">
            Reach out for research collaboration, technical writing, software
            engineering opportunities, cybersecurity work, or questions about my
            notes and projects.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {contactLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group border border-[#575253] bg-[#2F2D2E] p-6 transition hover:border-[#8C86AA]"
            >
              <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#8C86AA]">
                {item.label}
              </p>

              <p className="mt-4 break-words text-xl font-semibold text-[#F2E8DC] group-hover:text-[#8C86AA]">
                {item.value}
              </p>
            </Link>
          ))}
        </div>

        <section className="mt-12 border border-[#575253] bg-[#2F2D2E] p-6">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#8C86AA]">
            Documents
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/media/resume.pdf"
              target="_blank"
              className="border border-[#8C86AA] px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#EAE0D5] transition hover:bg-[#8C86AA] hover:text-[#252324]"
            >
              Resume
            </Link>

            <Link
              href="/media/cv.pdf"
              target="_blank"
              className="border border-[#575253] px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#C8C0B6] transition hover:border-[#EAE0D5] hover:text-[#EAE0D5]"
            >
              CV
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
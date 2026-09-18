import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" className="site-brand" aria-label="ZyphenSVC home">
      <Image src="/media/classic/circleprofilepic.png" alt="" width={48} height={48} priority />
      <span>ZyphenSVC</span>
    </Link>
  );
}

import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div>
          <p className="font-bold text-primary mb-2">CompetitiveShikshka</p>
          <p className="text-muted-foreground">Your guide to JEE, NEET & govt exams.</p>
        </div>
        <div>
          <p className="font-bold mb-2">Resources</p>
          <ul className="space-y-1 text-muted-foreground">
            <li><Link href="/ncert" className="hover:text-primary transition-colors">NCERT Solutions</Link></li>
            <li><Link href="/pyqs" className="hover:text-primary transition-colors">PYQs</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-bold mb-2">Explore</p>
          <ul className="space-y-1 text-muted-foreground">
            <li><Link href="/colleges" className="hover:text-primary transition-colors">Colleges</Link></li>
            <li><Link href="/exams" className="hover:text-primary transition-colors">Exams</Link></li>
            <li><Link href="/calculators" className="hover:text-primary transition-colors">Calculators</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-bold mb-2">Connect</p>
          <ul className="space-y-1 text-muted-foreground">
            <li><Link href="/mentorship" className="hover:text-primary transition-colors">Mentorship</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border mx-6 pb-4 pt-3 text-xs text-muted-foreground">
        © {new Date().getFullYear()} CompetitiveShikshka. All rights reserved.
      </div>
    </footer>
  );
}

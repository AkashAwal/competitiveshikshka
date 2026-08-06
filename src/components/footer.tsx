import Link from "next/link";
import { GraduationCap } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div className="col-span-2 md:col-span-1">
          <p className="flex items-center gap-1.5 font-black text-lg text-foreground mb-2">
            <GraduationCap className="h-5 w-5 text-primary" /> CompetitiveShiksha
          </p>
          <p className="text-muted-foreground leading-relaxed max-w-[220px]">
            Verified college data, exam guides and 1-on-1 mentorship for JEE, NEET and government exam aspirants.
          </p>
        </div>
        <div>
          <p className="font-bold text-foreground mb-3">Explore</p>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link href="/colleges" className="hover:text-primary transition-colors">Colleges</Link></li>
            <li><Link href="/exams" className="hover:text-primary transition-colors">Entrance Exams</Link></li>
            <li><Link href="/calculators" className="hover:text-primary transition-colors">Rank Calculators</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-bold text-foreground mb-3">Mentorship</p>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link href="/mentorship" className="hover:text-primary transition-colors">Why mentorship</Link></li>
            <li><Link href="/mentorship/apply" className="hover:text-primary transition-colors">Apply now</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-bold text-foreground mb-3">Community</p>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="https://t.me/competitiveshiksha" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Telegram</a></li>
            <li><a href="https://discord.gg/BnVn9MHspT" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Discord</a></li>
            <li><a href="https://whatsapp.com/channel/0029VbDiP8R6xCSKqlUxjB0s" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border mx-4 sm:mx-6 py-4 text-xs text-muted-foreground">
        © {new Date().getFullYear()} CompetitiveShiksha. All rights reserved.
      </div>
    </footer>
  );
}

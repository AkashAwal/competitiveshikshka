import { PreHeader } from "@/components/preheader";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PreHeader />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}

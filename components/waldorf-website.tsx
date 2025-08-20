import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Services } from "@/components/sections/Services";
import { Trust } from "@/components/sections/Trust";
import Contact from "@/components/sections/Contact";

export default function WaldorfSchoolsWebsite() {
  return (
    <div className="min-h-screen bg-white font-['Outfit',sans-serif] overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Features />
        <Services />
        <Trust />
        <Contact />
      </main>
      {/* A simple footer can be added here */}
    </div>
  );
}
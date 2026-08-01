import Navbar from "@/components/Header";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Hackathons from "@/components/Hackathons";
import Achievements from "@/components/Achievements";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import EntryPopup from "@/components/EntryPopup";
import InstallPrompt from "@/components/InstallPrompt";
import { PortfolioProvider } from "@/contexts/PortfolioContext";

export default function Home() {
  return (
    <PortfolioProvider>
      <main className="bg-[#050505] min-h-screen text-white relative">
        <EntryPopup />
        <InstallPrompt />
        <Navbar />
        <Hero />
        <Skills />
        <Projects />
        <Hackathons />
        <Achievements />
        <Resume />
        <Contact />
        <Footer />
      </main>
    </PortfolioProvider>
  );
}
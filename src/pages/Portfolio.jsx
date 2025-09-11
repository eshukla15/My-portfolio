import { StarBackground } from "../components/StarBackground";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectSection } from "../components/ProjectSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { CertificatesSection } from "../components/CertificatesSection";

function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <StarBackground />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectSection />
        <CertificatesSection />
        <SkillsSection />
        
        
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default Portfolio;
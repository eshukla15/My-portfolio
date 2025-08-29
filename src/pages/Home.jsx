import { StarBackground } from "../components/StarBackground";
import { ThemeToggle } from "../components/ThemeToggle";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectSection";
import { ContactSection } from "../components/ContactSection";

import { Footer } from "../components/Footer";
import { CertificatesSection } from "../components/CertificatesSection";
export const Home = () => {
    
    return (
        <div className="min-h-screen  bg-background text-foreground overflow-x-hidden">
            

            {/*bg effects*/}
            <StarBackground />
            {/*navbar*/}
            <Navbar />
            {/*main content*/}
            <main>
                <HeroSection />
                <AboutSection />
                <SkillsSection />
                <CertificatesSection />
                <ProjectsSection />
                <ContactSection />
                
            </main>
            {/*Footer*/}
            <Footer />

        </div>
    )
};
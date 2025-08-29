import { Briefcase, Shield, Code,  User, ComputerIcon } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      {" "}
      
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center space-y-6 ">
            
            <h3 className="text-2xl font-semibold">
              Aspiring Ethical Hacker
            </h3>

            <p className="text-muted-foreground">
              "A passionate tech enthusiast exploring Networking, Cybersecurity, and Full-Stack Development, with a drive to build and break systems to understand them better."
            </p>

            <p className="text-muted-foreground">
              A life-long student fascinated by computer science because it is an ever-evolving field that forms the foundation of innovation across every domain.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                {" "}
                Get In Touch
              </a>

              <a
                href="https://drive.google.com/file/d/1VBDo-HHzVsLUDBXcucTOT7b4lNG7drz1/view?usp=sharing"
                className="px-6  py-2 font-bold rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                Download Resume
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">  Cybersecurity & Ethical Hacking</h4>
                  <p className="text-muted-foreground">
                    Exploring system vulnerabilities, securing networks, and practicing responsible ethical hacking.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <ComputerIcon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Full stack Development</h4>
                  <p className="text-muted-foreground">
                    Building scalable web applications from frontend to backend with modern frameworks and databases..
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>

                <div className="text-left">
                  <h4 className="font-semibold text-lg">Data Structures & Algorithms</h4>
                  <p className="text-muted-foreground">
                    Designing efficient algorithms and mastering data structures to solve complex problems effectively.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import "@fontsource/libertinus-serif"; 
import { Link } from "react-router-dom";
export default function Resume() {
  return (
    <div className="font-[Cambria] leading-relaxed min-h-screen bg-background text-foreground flex px-6 py-6">
      <div className="max-w-2xl space-y-8 text-left">
        {/* Header */}
        <header>
          <h1 className="text-3xl font-bold">Eshan Shukla</h1>
          <p className=" text-muted-foreground">
            New Delhi, India
          </p>
          <p >
            <a href="mailto:eshukla15@gmail.com" className="hover:underline">
              eshukla15@gmail.com
            </a>{" "}
            | +91 9336220936
          </p>
          <p>
            <a href="https://linkedin.com?in/eshan-shukla" className="font:sm hover:underline  text-blue-400" >LinkedIn    </a>|<a href="https://github.com/eshukla15" className="hover:underline text-blue-400"> GitHub </a>
             | 
          
<Link to="/portfolio" className="hover:underline text-blue-400">
  Portfolio
</Link> </p>
        </header>

        {/* Summary */}
        <section>
          <h2 className="text-xl font-bold">Summary</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Aspiring ethical hacker with hands-on experience in MERN stack development, Python scripting, and basic cyber security. Quick to pick up new technologies and comfortable navigating diverse tools and environments. Eager to contribute to impactful projects while growing technical expertise in dynamic, team-oriented settings.
          </p>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xl font-bold">Education</h2>
          <p className="text-sm font-medium">
            APJ Abdul Kalam Technical University - Bachelor of Technology in Computer Science 
          </p>
          
            Bachelor of Technology in Computer Science 
          
          <p className="text-xs text-muted-foreground">2026 | CGPA: 7.5</p>
          <p className="text-sm">
            <b>Relevant Coursework:</b> DSA, OS, DBMS, Computer Networks, Computer Architecture
          </p>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-xl font-bold">Projects</h2>
          <div className="space-y-3">
            <div>
              <p className="text-m font-medium">ZugZwang AI : Chess Engine | <a href="https://github.com/eshukla15/zugZwangAI" className="text:sm hover:underline text-blue-400" >Github</a></p>
              <p className="text-xs text-muted-foreground">
                Pygame, Python, Algorithms, Git, Github
              </p>
              <ul className="list-disc list-inside text-sm">
                <li>Engineered a chess game with alpha-beta pruning for efficient decision-making and move evaluation.</li>
                <li>Achieved an estimated ELO of ~1400 with integrated evaluation heuristics.</li>
              </ul>
            </div>

            <div>
              <p className="text-m font-medium">Nexus : Real-time Chat Application | <a href="https://github.com/eshukla15/Nexus-chatApplication" className="text:sm hover:underline text-blue-400" >Github</a></p>
              <p className="text-xs text-muted-foreground">
                MongoDB, Express.js, React, Node.js, Github
              </p>
              <ul className="list-disc list-inside text-sm">
                <li>Designed and deployed a real-time communication platform enabling dynamic user interactions.</li>
                <li>Integrated Cloudinary for image sharing and implemented JWT-based authentication.</li>
              </ul>
            </div>

            <div>
              <p className="text-m font-medium">Packet Sniffer | <a href="https://github.com/eshukla15/PacketSniffer" className="text:sm hover:underline text-blue-400" >Github</a></p>
              <p className="text-xs text-muted-foreground">Python, Github</p>
              <ul className="list-disc list-inside text-sm">
                <li>Developed a packet sniffer using raw sockets to capture and analyze real-time network traffic.</li>
                <li>Implemented protocol parsing (IP, TCP, UDP, ICMP) and displayed packet metadata.</li>
                <li>Gained hands-on experience with network layers, socket programming, and packet inspection.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-xl font-bold">Technical Skills</h2>
          <p className="text-sm"><b>Languages:</b> Python, C, JavaScript, C++, HTML, CSS</p>
          <p className="text-sm"><b>Frameworks</b>: React.js, Express, Node.js</p>
          <p className="text-sm"><b>Libraries</b>: ShadcnUI, Zustand, Socket.io</p>
          <p className="text-sm"><b>Databases</b>: MongoDB</p>
          <p className="text-sm"><b>Dev Tools</b>: VS Code, Git, Github, Vercel, PostMan</p>
          <p className="text-sm"><b>Cyber Tools</b>: Nmap, Wireshark, Burp Suite (Basic), Metasploit (Basic), Linux</p>
        </section>

        

        {/* Activities */}
        <section>
          <h2 className="text-xl font-bold">Activities</h2>
          <p className="text-sm font-medium">Discipline Committee : Co-ordinator</p>
          <p className="text-xs text-muted-foreground">Ajay Kumar Garg Engineering College, Ghaziabad<br></br>Apr 2023 – May 2024</p>
          <ul className="list-disc list-inside text-sm">
            <li>Ensured smooth conduct and adherence to code of conduct during institutional events.</li>
            <li>Contributed to maintaining decorum and organizing campus activities.</li>
          </ul>
        </section>

        
      </div>

      {/* Floating download button */}
      <a
  href="https://drive.google.com/file/d/1VBDo-HHzVsLUDBXcucTOT7b4lNG7drz1/view"
  download
  className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-500 transition-colors text-sm font-medium"
>
  Download Resume
</a>
    </div>
  );
}

import { ArrowRight, ExternalLink, Github, Zap, Globe, Gamepad2, Sparkles, Brain, Palette, GraduationCap, Star, Code, Layers, Rocket ,MessageCircle} from "lucide-react";
import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";

const projects = [
 {
 id: 1,
 title: "💬 Nexus - Real-time Chat Application",
 description: "A full-stack chat application built using the MERN stack. Nexus allows users to create accounts, send real-time messages, update profiles, and experience a sleek, responsive UI with 32 different themes.",
 image: "/projects/project1.png",
 tags: ["React.js", "Express.js", "MongoDB", "Zustand", "TailwindCSS", "Cloudinary", "Socket.io"],
 demoUrl: "https://nexus-oj5w.onrender.com/",
 githubUrl: "https://github.com/eshukla15/Nexus-chatApplication",
 icon: MessageCircle, 
 gradient: "from-blue-500 to-purple-500",
 color: "purple",
 difficulty: "Advanced",
 category: "Full-Stack"
},
  
  {
    id: 2,
    title: "ZugZwangAI - Python Chess Engine",
    description: "A Python- based chess engine featuring a GUI built with Pygame, castling, en passant, promotion logic, and AI using heuristics to evaluate board positions.",
    image: "/projects/project2.png",
    tags: ["Python", "Pygame", "Algorithms"],
    githubUrl: "https://github.com/eshukla15/zugZwangAI",
    icon: Gamepad2,
    gradient: "from-green-500 to-teal-500",
    color: "green",
    difficulty: "Advanced",
    category: "Games"
  },
  {
    id: 3,
    title: "Windows Raw Packet Sniffer",
    description: "Minimal Python-based packet sniffer that captures IPv4 packets directly from your network interface using raw sockets.",
    image: "/projects/project3.png",
    tags: ["Python", "Networking", "Sockets"],
    githubUrl: "https://github.com/eshukla15/PacketSniffer",
    icon: Sparkles,
    gradient: "from-orange-500 to-red-500",
    color: "orange",
    difficulty: "Intermediate",
    category: "Networking"
  },

  {
    id: 3,
    title: "Poseidon - Lil bro of Zeus",
    description: " simple keylogger script built in Python",
    image: "/projects/project4.png",
    tags: ["Python", "Networking", "Sockets"],
    githubUrl: "https://github.com/eshukla15/Poseidon",
    icon: Sparkles,
    gradient: "from-orange-500 to-red-500",
    color: "orange",
    difficulty: "Beginner",
    category: "Cybersecurity"
    
  },
  
  
  
];

const FloatingParticles = () => {
  const mountRef = useRef(null);
  const frameRef = useRef();
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Clean up any existing scene
    if (sceneRef.current) {
      sceneRef.current.dispose();
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced particle system with better performance and NaN protection
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = Math.min(200, Math.max(50, Math.floor(window.innerWidth / 10))); // Ensure minimum count
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    const velocityArray = new Float32Array(particlesCount * 3);

    // Generate valid positions and velocities with NaN protection
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position with bounds checking
      posArray[i] = (Math.random() - 0.5) * 15;
      posArray[i + 1] = (Math.random() - 0.5) * 15;
      posArray[i + 2] = (Math.random() - 0.5) * 15;
      
      // Velocity with bounds checking
      velocityArray[i] = (Math.random() - 0.5) * 0.002;
      velocityArray[i + 1] = (Math.random() - 0.5) * 0.002;
      velocityArray[i + 2] = (Math.random() - 0.5) * 0.002;
      
      // Ensure no NaN values
      if (isNaN(posArray[i]) || isNaN(posArray[i + 1]) || isNaN(posArray[i + 2])) {
        posArray[i] = 0;
        posArray[i + 1] = 0;
        posArray[i + 2] = 0;
      }
      
      if (isNaN(velocityArray[i]) || isNaN(velocityArray[i + 1]) || isNaN(velocityArray[i + 2])) {
        velocityArray[i] = 0.001;
        velocityArray[i + 1] = 0.001;
        velocityArray[i + 2] = 0.001;
      }
      
      // Enhanced color palette
      const hue = Math.random();
      colorArray[i] = hue > 0.5 ? 0.5 + hue * 0.5 : hue;
      colorArray[i + 1] = Math.random() * 0.8 + 0.2;
      colorArray[i + 2] = 1;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.015,
      transparent: true,
      opacity: 0.7,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 5;

    // Store scene reference for cleanup
    sceneRef.current = {
      scene,
      camera,
      renderer,
      particlesGeometry,
      particlesMaterial,
      dispose: () => {
        scene.clear();
        particlesGeometry.dispose();
        particlesMaterial.dispose();
        renderer.dispose();
      }
    };

    // Enhanced animation with floating particles and NaN protection
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      const positions = particlesMesh.geometry.attributes.position.array;
      
      for (let i = 0; i < particlesCount * 3; i += 3) {
        // Update positions with bounds checking
        positions[i] += velocityArray[i];
        positions[i + 1] += velocityArray[i + 1];
        positions[i + 2] += velocityArray[i + 2];
        
        // Boundary checking for seamless loop
        if (Math.abs(positions[i]) > 8) velocityArray[i] *= -1;
        if (Math.abs(positions[i + 1]) > 8) velocityArray[i + 1] *= -1;
        if (Math.abs(positions[i + 2]) > 8) velocityArray[i + 2] *= -1;
        
        // NaN protection
        if (isNaN(positions[i]) || isNaN(positions[i + 1]) || isNaN(positions[i + 2])) {
          positions[i] = (Math.random() - 0.5) * 15;
          positions[i + 1] = (Math.random() - 0.5) * 15;
          positions[i + 2] = (Math.random() - 0.5) * 15;
          velocityArray[i] = (Math.random() - 0.5) * 0.002;
          velocityArray[i + 1] = (Math.random() - 0.5) * 0.002;
          velocityArray[i + 2] = (Math.random() - 0.5) * 0.002;
        }
      }
      
      particlesMesh.geometry.attributes.position.needsUpdate = true;
      particlesMesh.rotation.x += 0.0008;
      particlesMesh.rotation.y += 0.0012;
      particlesMesh.rotation.z += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        try {
          mountRef.current.removeChild(renderer.domElement);
        } catch (e) {
          // Element might already be removed
        }
      }
      if (sceneRef.current) {
        sceneRef.current.dispose();
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" />;
};

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let animationFrameId;

    const handleMouseMove = (e) => {
      if (animationFrameId) return;
      
      animationFrameId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = Math.max(-25, Math.min(25, ((y - centerY) / centerY) * -15));
        const rotateY = Math.max(-25, Math.min(25, ((x - centerX) / centerX) * 15));

        setMousePosition({ x, y });

        card.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05) translateZ(30px)`;
        card.style.transition = 'none';
        
        animationFrameId = null;
      });
    };

    const handleMouseLeave = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      card.style.transform = 'perspective(1500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0px)';
      card.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.320, 1)';
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Beginner': 'text-green-400 bg-green-500/20 border-green-400/40',
      'Intermediate': 'text-yellow-400 bg-yellow-500/20 border-yellow-400/40',
      'Advanced': 'text-orange-400 bg-orange-500/20 border-orange-400/40',
      'Expert': 'text-red-400 bg-red-500/20 border-red-400/40'
    };
    return colors[difficulty] || 'text-gray-400 bg-gray-500/20 border-gray-400/40';
  };

  const Icon = project.icon;

  return (
    <article
      ref={cardRef}
      className="project-card group relative bg-gray-900/70 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-700/50 transition-all duration-700 hover:border-gray-500/50 opacity-0 translate-y-10 scale-95 will-change-transform"
      style={{
        transformOrigin: 'center center',
        transitionDelay: `${index * 0.1}s`,
        boxShadow: isHovered
          ? `0 40px 80px -20px rgba(0,0,0,0.9), 0 0 60px rgba(255,255,255,0.3), inset 0 1px 0 rgba(255,255,255,0.1)`
          : '0 20px 40px -10px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)'
      }}
      role="article"
      aria-label={`Project: ${project.title}`}
    >
      {/* Enhanced gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-700`} />
      
      {/* Multiple floating orb effects */}
      <div className="absolute -inset-8 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${project.gradient} blur-2xl opacity-30 animate-pulse`} />
        <div className={`absolute inset-4 rounded-3xl bg-gradient-to-l ${project.gradient} blur-xl opacity-20 animate-pulse`} style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Top badges with enhanced styling */}
      <div className="absolute top-4 left-4 right-4 z-30 flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <span className={`px-3 py-1.5 text-xs font-semibold rounded-xl ${getDifficultyColor(project.difficulty)} border backdrop-blur-md`}>
            {project.difficulty}
          </span>
          <span className="px-3 py-1.5 text-xs font-semibold rounded-xl text-gray-300 bg-gray-800/80 border border-gray-600/50 backdrop-blur-md">
            {project.category}
          </span>
        </div>
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.gradient} p-3 transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 shadow-2xl`}>
          <Icon size={26} className="text-white" />
        </div>
      </div>

      {/* Mouse follower effect */}
      {isHovered && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300 z-10"
          style={{
            left: mousePosition.x - 50,
            top: mousePosition.y - 50,
            width: 100,
            height: 100,
            background: `radial-gradient(circle, ${project.gradient.includes('purple') ? 'rgba(168,85,247,0.3)' : 'rgba(6,182,212,0.3)'} 0%, transparent 70%)`,
            borderRadius: '50%',
            filter: 'blur(20px)'
          }}
        />
      )}

      {/* Image section with lazy loading */}
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10" />
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
          loading="lazy"
          onLoad={() => setIsImageLoaded(true)}
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/800x600/1f2937/ffffff?text=${encodeURIComponent(project.title)}`;
          }}
        />
        
        {/* Loading placeholder */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-gray-600 border-t-cyan-500 rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Overlay pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/40 z-10" />
      </div>

      {/* Content */}
      <div className="p-6 relative z-10">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, tagIndex) => (
            <span
              key={tag}
              className={`px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${project.gradient} bg-opacity-20 text-white border border-white/10 transform transition-all duration-300 hover:scale-105`}
              style={{ animationDelay: `${tagIndex * 0.1}s` }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className={`text-xl font-bold mb-3 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}>
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-6 leading-relaxed group-hover:text-white transition-colors duration-300">
          {project.description}
        </p>

        {/* Action buttons */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            {project.demoUrl && project.demoUrl !== "#" && (
              <a 
                href={project.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${project.gradient} text-white text-sm font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-current/25`}
                aria-label={`View live demo of ${project.title}`}
              >
                <ExternalLink size={14} /> 
                Live Demo
              </a>
            )}
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-white text-sm font-medium border border-white/10 transform transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-white/20"
              aria-label={`View source code of ${project.title} on GitHub`}
            >
              <Github size={14} /> 
              Code
            </a>
          </div>
          
        </div>
      </div>

      {/* Bottom accent line */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
    </article>
  );
};

const ProjectFilter = ({ activeFilter, setActiveFilter }) => {
  const filters = [
    { id: 'all', label: 'All Projects', icon: Layers },
    { id: 'AI/ML', label: 'AI & ML', icon: Brain },
    { id: 'Game Dev', label: 'Games', icon: Gamepad2 },
    { id: 'Real-time', label: 'Real-time', icon: Zap },
    { id: 'Website', label: 'Websites', icon: Code },
    { id: 'Cybersecurity', label: 'Cybersecuirty', icon: Code }

  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-16" role="tablist" aria-label="Project filters">
      {filters.map((filter) => {
        const Icon = filter.icon;
        return (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
              activeFilter === filter.id
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
            }`}
            role="tab"
            aria-selected={activeFilter === filter.id}
            aria-controls="projects-grid"
          >
            <Icon size={16} />
            {filter.label}
          </button>
        );
      })}
    </div>
  );
};

export const ProjectsSection = () => {
  const containerRef = useRef();
  const titleRef = useRef();
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = useMemo(() => {
    return activeFilter === 'all' 
      ? projects 
      : projects.filter(project => project.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="relative py-32 px-4 min-h-screen bg-transparent overflow-hidden">
      {/* Background effects */}
      <FloatingParticles />
      
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-5" 
        style={{
          backgroundImage: 
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Radial gradient overlay */}
      <div 
        className="absolute inset-0" 
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(6,182,212,0.1) 0%, transparent 50%)'
        }}
      />

      <div ref={containerRef} className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Projects</span>
        </h2>
          <p className="text-gray-400 text-lg max-w-4xl mx-auto leading-relaxed">
            A curated collection of my most impactful work — showcasing expertise in full-stack development,
            3D graphics, AI integration, and cutting-edge web technologies. Each project represents a unique
            challenge solved with innovative solutions.
          </p>
      

        {/* Filter buttons */}
        <ProjectFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

        {/* Projects grid */}
        <div id="projects-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Call to action */}
        <footer className="text-center space-y-8">
          <div className="flex justify-center items-center gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <Code size={20} />
              <span>{projects.length}+ Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <Github size={20} />
              <span>Open Source</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={20} />
              <span>Production Ready</span>
            </div>
          </div>
          
          <a
            href="https://github.com/eshukla15"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 group focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            aria-label="Visit my GitHub profile"
          >
            <Github size={20} className="group-hover:rotate-12 transition-transform duration-300" />
            Explore More on GitHub
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </footer>
      </div>
    </section>
  );
};
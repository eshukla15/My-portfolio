import {
    Award,
    Star,
    ExternalLink,
    Calendar,
    Shield,
    Trophy,
    Zap,
    Globe,
    Code,
    Brain,
    Sparkles,
    CheckCircle,
    ArrowRight,
    Cloud,
    ServerIcon,
    Database,
    ChevronRight,
    Verified,
    
    Crown,
    Flame,
    Gem,
    Rocket,
    Wand2,
    Infinity,
    Wifi,
    WashingMachine,
    Heart,
    User,
    BarChart3
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const certificates = [
    {
    id: 1,
    title: "Ethical Hacker",
    issuer: "Cisco Networking Academy",
    date: "August 17, 2025",
    credentialId: "", // You might have a credential ID not shown in the image
    description: "Training in ethical hacking methodologies, penetration testing, network security, and vulnerability analysis using standard tools and techniques.",
    skills: [
        "Ethical Hacking",
        "Penetration Testing", 
        "Network Security",
        "Vulnerability Assessment",
        "Security Tools",
        "Cybersecurity",
        "Threat Analysis",
        "Network Defense"
    ],
    icon: Shield, // Or a security-related icon
    gradient: "from-red-600 via-red-500 to-red-700",
    color: "purple",
    verified: true,
    level: "Professional",
    hours: "70 hours", // Typical duration for such courses
    link: "https://drive.google.com/file/d/1RHJAekOrC0gcJ0dpGj7bjVSo2OuvY7ey/view?usp=sharing", // Replace with actual link to your certificate
    category: "Cybersecurity"
},
    {
        id: 2,
        title: "Fundamentals of Deep Learning",
        issuer: "NVIDIA",
        date: "March 2025",
        expiryDate: "December 2035",
        credentialId: "OnPSIGOwTISgSkpyePQBkg",
        description: "Comprehensive introduction to deep learning concepts, neural networks, and GPU-accelerated computing using NVIDIA's platforms and tools.",
        skills: ["Deep Learning", "Neural Networks", "GPU Computing", "TensorFlow", "PyTorch", "AI Fundamentals"],
        icon: Brain, // Or a neural network icon
        gradient: "from-green-600 via-green-500 to-green-700",
        color: "green",
        verified: true,
        level: "Advanced",
        hours: "8",
        link: "https://drive.google.com/file/d/13z3CTOu1M6APFHGa27QYMEZocmNl4nns/view?usp=sharing", // Replace with actual link
        category: "AIML"
    },
    {
    id: 3,
        title: "Introduction to Internet of Things",
        issuer: "NPTEL",
        date: "May 2024",
        credentialId: "NPTEL24CS355655900798",
        description: "Fundamentals of IoT architecture, sensors, connectivity protocols, and applications in smart devices and systems.",
        skills: ["IoT", "Sensors", "Connectivity Protocols", "Embedded Systems", "Smart Devices", "Data Acquisition"],
        icon: WashingMachine, // Or a sensor icon
        gradient: "from-blue-600 via-blue-500 to-blue-700",
        color: "blue",
        verified: true,
        level: "Intermediate",
        hours: "40 hours",
        link: "https://drive.google.com/file/d/1CDneylnsWlvpbuFM2qU0Myauz7QITOCd/view?usp=sharing", // Replace with actual link
        category: "IoT"
    },
        {
        id: 4,
        title: "Emotional Intelligence",
        issuer: "NPTEL",
        date: "April 2024",
        credentialId: "NPTEL24HS065458100231",
        description: "Development of emotional awareness, self-regulation, empathy, and interpersonal skills for professional and personal growth.",
        skills: ["Emotional Awareness", "Self-Regulation", "Empathy", "Interpersonal Skills", "Communication", "Leadership"],
        icon: Heart, // Or a psychology-related icon
        gradient: "from-pink-600 via-pink-500 to-pink-700",
        color: "pink",
        verified: true,
        level: "Beginner",
        hours: "30 hours",
        link: "https://drive.google.com/file/d/1mVdjHsdQ3p8_hNkzWtPxQyIxF5_ffeTD/view?usp=sharing", // Replace with actual link
        category: "Soft Skills"
    },
    {
        id: 5,
        title: "Enhancing Soft Skills and Personality",
        issuer: "NPTEL",
        date: "April 2023",
        credentialId: "NPTEL23HS30543590663",
        description: "Comprehensive program focusing on communication skills, teamwork, leadership, and personal development for professional success.",
        skills: ["Communication", "Teamwork", "Leadership", "Personality Development", "Presentation Skills", "Time Management"],
        icon: User, // Or a communication icon
        gradient: "from-purple-600 via-purple-500 to-purple-700",
        color: "purple",
        verified: true,
        level: "Beginner",
        hours: "35 hours",
        link: "https://drive.google.com/file/d/1Ow4On-UwJ2DIS01OxKQdtPTQQ4N1ujO_/view?usp=sharing", // Replace with actual link
        category: "Soft Skills"
    },
    {
    id: 6,
    title: "Data Science with Python",
    issuer: "Infosys Springboard", 
    date: "April 2025",
    expiryDate: "April 2035",
    credentialId: "",
    description: "Comprehensive training in Python programming for data science applications, covering data manipulation, analysis, visualization, and statistical modeling techniques using popular Python libraries.",
    skills: [
        "Python Programming",
        "Data Analysis", 
        "Data Visualization",
        "Statistical Modeling",
        "Pandas",
        "NumPy",
        "Matplotlib",
        "Seaborn",
        "Data Wrangling"
    ],
    icon: BarChart3,
    gradient: "from-indigo-600 via-indigo-500 to-indigo-700",
    color: "indigo",
    verified: true,
    level: "Intermediate",
    hours: "60 hours",
    link: "https://drive.google.com/file/d/1ORWGl4tTXFf0b0scMF6A6NAxI5ajwz9Z/view?usp=sharing", // Replace with actual link to DS-Python.pdf
    category: "Data Science"
},
{
    id: 7,
    title: "Fundamentals of Machine Learning with scikit-learn",
    issuer: "Infosys Springboard",
    date: "April 2025", 
    expiryDate: "April 2035",
    credentialId: "",
    description: "Foundational course covering machine learning algorithms, model training, evaluation techniques, and implementation using Python's scikit-learn library for building predictive models.",
    skills: [
        "Machine Learning",
        "scikit-learn", 
        "Python",
        "Supervised Learning",
        "Unsupervised Learning",
        "Model Evaluation",
        "Feature Engineering",
        "Algorithm Implementation",
        "Predictive Modeling"
    ],
    icon: Brain,
    gradient: "from-purple-600 via-purple-500 to-purple-700",
    color: "purple",
    verified: true,
    level: "Intermediate",
    hours: "50 hours",
    link: "https://drive.google.com/file/d/16EA3R1y8FOF-4FXY3pxqEgcpQ2ZLZc4k/view?usp=sharing", // Replace with actual link to ML(sickit).pdf
    category: "AIML"
}
];



const FloatingParticles = () => {
    const [particles, setParticles] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        // Check for dark mode
        const checkDarkMode = () => {
            const isDark = document.documentElement.classList.contains('dark') ||
                window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(isDark);
        };

        checkDarkMode();
        window.addEventListener('storage', checkDarkMode);

        // Reduce particles on mobile
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 15 : 30;

        const newParticles = Array.from({ length: particleCount }, (_, i) => ({
            id: i,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * (isMobile ? 4 : 6) + 2,
            speedX: (Math.random() - 0.5) * (isMobile ? 1.5 : 3),
            speedY: (Math.random() - 0.5) * (isMobile ? 1.5 : 3),
            opacity: Math.random() * 0.5 + 0.1,
            color: isDarkMode
                ? ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#EC4899'][Math.floor(Math.random() * 6)]
                : ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#EC4899'][Math.floor(Math.random() * 6)],
            shape: Math.random() > 0.5 ? 'circle' : 'square'
        }));
        setParticles(newParticles);

        const interval = setInterval(() => {
            setParticles(prev => prev.map(particle => ({
                ...particle,
                x: (particle.x + particle.speedX + window.innerWidth) % window.innerWidth,
                y: (particle.y + particle.speedY + window.innerHeight) % window.innerHeight
            })));
        }, 50);

        return () => {
            clearInterval(interval);
            window.removeEventListener('storage', checkDarkMode);
        };
    }, [isDarkMode]);

    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            {particles.map(particle => (
                <div
                    key={particle.id}
                    className={`absolute ${particle.shape === 'circle' ? 'rounded-full' : 'rounded-sm'} animate-pulse`}
                    style={{
                        left: particle.x,
                        top: particle.y,
                        width: particle.size,
                        height: particle.size,
                        backgroundColor: particle.color,
                        opacity: particle.opacity,
                        filter: 'blur(1px)',
                        transform: `rotate(${particle.x * 0.1}deg)`
                    }}
                />
            ))}
        </div>
    );
};



const CertificateCard = ({ certificate, index }) => {
    const cardRef = useRef();
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [magicOrbs, setMagicOrbs] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
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

    const getLevelColor = (level) => {
        const colors = {
            'Beginner': 'text-green-500 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-500/20 dark:border-green-400/40',
            'Intermediate': 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-500/20 dark:border-yellow-400/40',
            'Professional': 'text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-500/20 dark:border-blue-400/40',
            'Advanced': 'text-purple-600 bg-purple-50 border-purple-200 dark:text-purple-400 dark:bg-purple-500/20 dark:border-purple-400/40',
            'Expert': 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-500/20 dark:border-red-400/40'
        };
        return colors[level] || 'text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-500/20 dark:border-gray-400/40';
    };

    const Icon = certificate.icon;
    const levelIcons = {
        'Beginner': Star,
        'Intermediate': Zap,
        'Professional': Crown,
        'Advanced': Gem,
        
    };
    const LevelIcon = levelIcons[certificate.level] || Star;

    return (
        <div
            ref={cardRef}
            className="certificate-card relative bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl md:rounded-3xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50  opacity-0  scale-95 will-change-transform group shadow-lg dark:shadow-2xl"
            style={{
                transformOrigin: 'center center',
                
                
            }}
        >

            

            

            {/* Category badge */}
            <div className="absolute top-3 right-3 md:top-4 md:right-4 z-20">
                <div className={`px-2 py-1 md:px-3 md:py-1.5 text-xs font-bold rounded-lg md:rounded-xl  ${certificate.gradient} text-white shadow-lg   transition-all duration-300 border border-white/20`}>
                    <div className="flex items-center gap-1">
                        <span className="hidden sm:inline">{certificate.category}</span>
                        <span className="sm:hidden">{certificate.category.split(' ')[0]}</span>
                    </div>
                </div>
            </div>

            {/* Header */}
            <div className="p-4 md:p-6 pb-3 md:pb-4">
                <div className="flex items-start justify-between mb-4 md:mb-5">
                    <div className={`relative w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br ${certificate.gradient} p-2.5 md:p-3  transition-all duration-500  shadow-lg md:shadow-2xl`}>
                        <Icon size={isMobile ? 20 : 24} className="text-white" />
                        <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-white/20 opacity-0  transition-opacity " />
                    </div>

                    <div className="flex flex-col items-end gap-1.5 md:gap-2">
                        <div className="flex items-center gap-1.5 md:gap-2">
                            
                            
                        </div>
                        
                    </div>
                </div>

                <h3 className={`text-lg md:text-xl font-black mb-2 bg-gradient-to-r ${certificate.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 leading-tight`}>
                    {certificate.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm font-semibold flex items-center gap-2 mb-2">
                    <Verified size={12} className="text-blue-500 dark:text-blue-400 flex-shrink-0" />
                    <span className="truncate">{certificate.issuer}</span>
                </p>

                <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 md:mb-4 leading-relaxed line-clamp-3">
                    {certificate.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                    {certificate.skills.slice(0, isMobile ? 4 : 6).map((skill, skillIndex) => (
                        <span
                            key={skill}
                            className={`px-2 py-1 md:px-2.5 md:py-1 text-xs font-semibold rounded-full  bg-opacity-20 text-gray-700 dark:text-white/90 border border-gray-200 dark:border-white/20 backdrop-blur-sm transform transition-all duration-300 ${!isMobile ? 'hover:bg-opacity-30 hover:rotate-1' : ''} cursor-default`}
                            
                        >
                            {skill}
                        </span>
                    ))}
                    {certificate.skills.length > (isMobile ? 4 : 6) && (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600">
                            +{certificate.skills.length - (isMobile ? 4 : 6)}
                        </span>
                    )}
                </div>

               
                
            </div>

            {/* Certificate link */}
                <hr className="border-t border-gray-200/50 dark:border-gray-700/50" />
                <div className="p-4 md:p-6 pt-3 md:pt-4">
                    <a href={certificate.link} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2  text-white font-bold sm:font-black text-sm sm:text-base rounded-2xl sm:rounded-3xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl sm:hover:shadow-2xl hover:shadow-purple-500/30 sm:hover:shadow-purple-500/40 group focus:outline-none focus:ring-2 focus:ring-purple-500/50 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        <span className="whitespace-nowrap">View Certificate</span>
                        <ArrowRight size={isMobile ? 20 : 24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </a>
                </div>
            
        </div>
    );
};

export const CertificatesSection = () => {
    const containerRef = useRef();
    const titleRef = useRef();
    const [visibleCount, setVisibleCount] = useState(6);
    const [filter, setFilter] = useState('all');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
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
            { threshold: 0.1, rootMargin: '100px' }
        );

        if (titleRef.current) {
            observer.observe(titleRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const categories = ['all', ...new Set(certificates.map(cert => cert.category))];
    const filteredCertificates = filter === 'all'
        ? certificates
        : certificates.filter(cert => cert.category === filter);

    const handleLoadMore = () => {
        setVisibleCount(prev => Math.min(prev + (isMobile ? 2 : 3), filteredCertificates.length));
    };

    const totalHours = certificates.reduce((sum, cert) => {
        const hours = cert.hours.match(/\d+/);
        return sum + (hours ? parseInt(hours[0]) : 0);
    }, 0);

    return (
        <section id="certificates" className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
            

            <div ref={containerRef} className="container mx-auto max-w-7xl relative z-10">
                {/* Enhanced Header with mobile-friendly layout */}
                <header
                    ref={titleRef}
                    className="text-center mb-12 sm:mb-16 lg:mb-20 opacity-0 translate-y-10 transition-all duration-1000"
                >
                    {/* Mobile-optimized header icons */}      
                        <div className="relative">
                            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                                My <span className="text-primary"> Certifications</span>
                            </h2>
                        </div>
                    

                    {/* Mobile-friendly description */}
                    <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-sm sm:text-base lg:text-lg max-w-4xl mx-auto leading-relaxed mb-4 sm:mb-6 px-2 sm:px-4">
                        Professional certifications and achievements that validate my expertise across
                        cutting-edge technologies, frameworks, and learning experiences. Each certificate
                        represents dedication to continuous learning and industry excellence.
                    </p>

                    {/* Mobile-optimized category filter */}
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 px-2">
                        {categories.map((category, index) => (
                            <button
                                key={category}
                                onClick={() => setFilter(category)}
                                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-500 transform hover:scale-105 ${filter === category
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                                    : 'bg-gray-800/50 dark:bg-gray-800/50 light:bg-gray-200/80 text-gray-300 dark:text-gray-300 light:text-gray-700 hover:bg-gray-700/50 dark:hover:bg-gray-700/50 light:hover:bg-gray-300/80 border border-gray-600/50 dark:border-gray-600/50 light:border-gray-300/50 hover:border-gray-500/50 dark:hover:border-gray-500/50 light:hover:border-gray-400/50'
                                    }`}
                                style={{
                                    animationDelay: `${index * 0.1}s`,
                                    animation: 'fadeInUp 0.5s ease-out forwards'
                                }}
                            >
                                {category === 'all' ? (
                                    <span className="flex items-center gap-1">
                                        <Infinity size={12} />
                                        All Categories
                                    </span>
                                ) : (
                                    <span className="truncate max-w-[100px] sm:max-w-none">
                                        {category}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </header>

                {/* Mobile-responsive certificates grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
                    {filteredCertificates.slice(0, visibleCount).map((certificate, index) => (
                        <CertificateCard key={certificate.id} certificate={certificate} index={index} />
                    ))}
                </div>

                {/* Mobile-optimized Load more button */}
                {visibleCount < filteredCertificates.length && (
                    <div className="text-center mb-12 sm:mb-16">
                        <button
                            onClick={handleLoadMore}
                            className="inline-flex items-center gap-2 sm:gap-4 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5  text-white font-bold sm:font-black text-sm sm:text-base rounded-2xl sm:rounded-3xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl sm:hover:shadow-2xl hover:shadow-purple-500/30 sm:hover:shadow-purple-500/40 group focus:outline-none focus:ring-2 focus:ring-purple-500/50 relative overflow-hidden"
                        >
                            <span className="whitespace-nowrap">Load More Certificates</span>
                        </button>
                    </div>
                )}
     
            </div>
        </section>
    );
};
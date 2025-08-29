import { useState, useEffect } from 'react';

export const PortfolioLoader = ({ onLoadingComplete }) => {
  const [currentLanguage, setCurrentLanguage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [loadingText, setLoadingText] = useState('Initializing');
  const [currentSkill, setCurrentSkill] = useState(0);

  // Indian languages and regions focused
 const nameTranslations = 
  [
  { name: "Eshan Shukla", lang: "English", script: "latin" },
  { name: "एशन शुक्ला", lang: "हिंदी", script: "devanagari" },
  { name: "এশন শুক্লা", lang: "বাংলা", script: "bengali" },
  { name: "ਏਸ਼ਨ ਸ਼ੁਕਲਾ", lang: "ਪੰਜਾਬੀ", script: "gurmukhi" },
  { name: "ఎషన్ శుక్లా", lang: "తెలుగు", script: "telugu" },
  { name: "எஷன் சுக்லா", lang: "தமிழ்", script: "tamil" },
  { name: "Eshan Shukla", lang: "Français", script: "latin" },
  { name: "Eshan Shukla", lang: "Español", script: "latin" }
];


  const skills = [
    "React.js", "Next.js", "TypeScript", "Three.js", 
    "Node.js", "Tailwind CSS", "Framer Motion", "GSAP",
    "WebGL", "D3.js", "UI/UX Design", "Creative Development"
  ];

  const loadingSteps = [
    'Initializing Systems...',
    'Loading Creative Assets...',
    'Preparing Interactive Elements...',
    'Optimizing Performance...',
    'Finalizing Experience...',
    'Welcome to My Portfolio!'
  ];

  // Language cycling effect - slower for better readability
  useEffect(() => {
    const languageInterval = setInterval(() => {
      setCurrentLanguage((prev) => (prev + 1) % nameTranslations.length);
    }, 200);

    return () => clearInterval(languageInterval);
  }, []);

  // Skills cycling
  useEffect(() => {
    const skillInterval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length);
    }, 800);

    return () => clearInterval(skillInterval);
  }, []);

  // Progress and loading text simulation
  useEffect(() => {
    let currentStep = 0;
    
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 3 + 1.5;
        const newProgress = Math.min(prev + increment, 100);
        
        // Update loading text based on progress
        const stepIndex = Math.floor((newProgress / 100) * (loadingSteps.length - 1));
        if (stepIndex !== currentStep) {
          currentStep = stepIndex;
          setLoadingText(loadingSteps[stepIndex]);
        }
        
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setLoadingText('Welcome to My Portfolio!');
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => onLoadingComplete?.(), 800);
          }, 1200);
        }
        
        return newProgress;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [onLoadingComplete]);

  const currentTranslation = nameTranslations[currentLanguage];

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-800 ease-out ${
        !isVisible ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'radial-gradient(ellipse at center, #0f0f23 0%, #1a1a2e 40%, #16213e 100%)'
      }}
    >
      {/* Dynamic background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 border border-blue-500/20 rotate-45 animate-spin" 
             style={{ animationDuration: '20s' }} />
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-purple-500/20 rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10 transform rotate-12 animate-bounce" 
             style={{ animationDuration: '3s' }} />
      </div>

      {/* Main content */}
      <div className="text-center z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo/Brand area */}
        <div className="mb-8 sm:mb-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-6 relative">
            {/* Advanced animated logo */}
            <div className="absolute inset-0 border-2 border-blue-500 rounded-xl animate-spin" 
                 style={{ animationDuration: '4s' }} />
            <div className="absolute inset-1 border border-purple-500/50 rounded-lg animate-pulse" />
            <div className="absolute inset-2 border border-pink-500/30 rounded animate-spin" 
                 style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                AK
              </span>
            </div>
          </div>
        </div>

        {/* Multilingual Name Display */}
        <div className="mb-6 sm:mb-8 h-20 sm:h-24 lg:h-28 flex items-center justify-center overflow-hidden">
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold transition-all duration-200 ease-out transform hover:scale-105"
            style={{
              textShadow: '0 4px 30px rgba(59, 130, 246, 0.4)',
              fontFamily: getOptimizedFont(currentTranslation.script)
            }}
            key={currentLanguage}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
              {currentTranslation.name}
            </span>
          </h1>
        </div>

        {/* Language indicator */}
        <div className="mb-6 sm:mb-8">
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-300 text-xs sm:text-sm font-medium backdrop-blur-sm transition-all duration-200">
            {currentTranslation.lang}
          </span>
        </div>

        {/* Professional title with dynamic skills */}
        <div className="mb-8 sm:mb-12 space-y-3 sm:space-y-4">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-light text-white tracking-wide">
            Creative Frontend Developer
          </h2>
          <div className="h-6 sm:h-8 flex items-center justify-center">
            <p className="text-blue-300 text-sm sm:text-base font-medium tracking-wider transition-all duration-500">
              Specializing in <span className="text-purple-400 font-semibold">{skills[currentSkill]}</span>
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4">
            {["React", "Next.js", "Three.js", "UI/UX", "Creative Dev"].map((tech, index) => (
              <span 
                key={tech}
                className="px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-blue-200 backdrop-blur-sm animate-pulse"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Enhanced progress section */}
        <div className="mb-8 sm:mb-12 space-y-4 sm:space-y-6">
          {/* Loading text */}
          <div className="text-gray-300 text-sm sm:text-base font-medium tracking-wide min-h-6">
            {loadingText}
          </div>

          {/* Advanced progress bar */}
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
            <div className="w-full h-1.5 sm:h-2 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-gray-700/50">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                <div className="absolute right-0 top-0 w-3 sm:w-4 h-full bg-white/70 rounded-full animate-pulse shadow-lg" />
              </div>
            </div>
            
            {/* Progress info */}
            <div className="flex justify-between mt-2 sm:mt-3 text-xs sm:text-sm text-gray-400">
              <span className="font-medium">Loading Portfolio</span>
              <span className="font-mono text-blue-300">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>

        {/* Animated loading dots */}
        <div className="flex justify-center space-x-2 sm:space-x-3 mb-8 sm:mb-12">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce"
              style={{ 
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1.2s'
              }}
            />
          ))}
        </div>

        {/* Enhanced status indicators */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-xs sm:text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
            <span>Systems Online</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50" 
                 style={{ animationDelay: '0.5s' }} />
            <span>Creative Engine Ready</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50" 
                 style={{ animationDelay: '1s' }} />
            <span>Portfolio Loading</span>
          </div>
        </div>

        {/* Location indicator */}
        <div className="mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500">
          <span className="inline-flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
            <span>Based in India • Available Worldwide</span>
          </span>
        </div>
      </div>

      {/* Enhanced background effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 lg:w-80 h-48 sm:h-64 lg:h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 lg:w-80 h-48 sm:h-64 lg:h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" 
             style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-pink-500/3 rounded-full blur-3xl animate-pulse"
             style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};

// Enhanced font selection for Indian languages
const getOptimizedFont = (script) => {
  const fontMap = {
    devanagari: '"Noto Sans Devanagari", "Poppins", sans-serif',
    bengali: '"Noto Sans Bengali", sans-serif',
    arabic: '"Noto Sans Arabic", sans-serif',
    gurmukhi: '"Noto Sans Gurmukhi", sans-serif',
    gujarati: '"Noto Sans Gujarati", sans-serif',
    telugu: '"Noto Sans Telugu", sans-serif',
    kannada: '"Noto Sans Kannada", sans-serif',
    tamil: '"Noto Sans Tamil", sans-serif',
    malayalam: '"Noto Sans Malayalam", sans-serif',
    odia: '"Noto Sans Oriya", sans-serif',
    latin: '"Inter", "Poppins", "SF Pro Display", system-ui, sans-serif'
  };
  
  return fontMap[script] || fontMap.latin;
};

export default PortfolioLoader;
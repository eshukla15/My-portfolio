/* eslint-disable react-hooks/exhaustive-deps */
import {
  Menu,
  X,
  Home,
  User,
  Code,
  Briefcase,
  Award,
  Mail,
  Sparkles,
  Sun,
  Moon,
  Zap,
  Trophy,
  GraduationCap,
  ChevronRight,
  Lightbulb,
  BookOpen
} from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { RemoveScroll } from 'react-remove-scroll'; // Import RemoveScroll

const cn = (...classes) => classes.filter(Boolean).join(' ');

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  // const [savedScrollPosition, setSavedScrollPosition] = useState(0); // No longer needed
  const navRef = useRef(null);

  const navItems = [
    { name: "Home", href: "#hero", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Projects", href: "#projects", icon: Briefcase },
    { name: "Certificates", href: "#certificates", icon: Award },
    { name: "Skills", href: "#skills", icon: Code },
    { name: "Contact", href: "#contact", icon: Mail },
  ];

  // --- Core Logic: Active Section and Scroll Handling ---
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    setIsScrolled(scrollY > 20);

    const progress = Math.min(scrollY / (documentHeight - windowHeight), 1);
    setScrollProgress(progress);

    let currentSectionId = 'hero';
    for (let i = navItems.length - 1; i >= 0; i--) {
      const item = navItems[i];
      const element = document.getElementById(item.href.substring(1));
      if (element) {
        const rect = element.getBoundingClientRect();
        // Adjust threshold: Check if top of element is within view and a significant portion is visible
        const threshold = windowHeight * 0.4; // Section is active when its top is within 40% of viewport
        if (rect.top <= threshold && rect.bottom > threshold) {
          currentSectionId = item.href.substring(1);
          break;
        }
      }
    }
    setActiveSection(currentSectionId);
  }, [navItems]);

  // --- Desktop Nav Mouse Glow Effect ---
  const handleMouseMove = useCallback((e) => {
    if (isHovered && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      setMousePosition({ x: e.clientX - navRect.left, y: e.clientY - navRect.top });
    }
  }, [isHovered, navRef]);

  // --- Effects for Event Listeners ---
  useEffect(() => {
    let scrollTimeout;
    const throttledScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        handleScroll();
        scrollTimeout = null;
      }, 50);
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [handleScroll, handleMouseMove]);

  // --- Mobile Drawer Scroll Lock / Unlock - Using react-remove-scroll ---
  // THIS useEffect IS NOW MUCH SIMPLER OR CAN BE REMOVED ALMOST ENTIRELY
  // The logic for locking/unlocking the body scroll will be handled by <RemoveScroll>
  // You no longer need to manually manage body styles or savedScrollPosition here.
  // The key is that RemoveScroll automatically handles the body scroll lock
  // and restores it when it's unmounted (i.e., when isMenuOpen becomes false).

  // --- Dark Mode Toggle & Initialization ---
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      document.documentElement.classList.toggle('dark', newMode);
      localStorage.setItem('theme', newMode ? 'dark' : 'light'); // Persist theme
      return newMode;
    });
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark');
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    } else {
      setIsDarkMode(systemPrefersDark);
      document.documentElement.classList.toggle('dark', systemPrefersDark);
    }
  }, []);

  // --- Smooth Scrolling Handler (for Nav Item Clicks) ---
  const handleSmoothScroll = useCallback((e, href) => {
    e.preventDefault();
    e.stopPropagation();

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      setIsMenuOpen(false); // Close mobile menu immediately

      // Small delay to allow menu closing animation to start, if any
      setTimeout(() => {
        const navHeight = navRef.current ? navRef.current.offsetHeight : 0;
        const offsetTop = targetElement.offsetTop - navHeight - 20;

        window.scrollTo({
          top: Math.max(0, offsetTop),
          behavior: 'smooth'
        });

        // After the scroll, ensure active section is updated (optional, as handleScroll also runs on scroll)
        // This is a redundant call but can help ensure immediate feedback
        setTimeout(() => handleScroll(), 400); // Give smooth scroll time to finish
      }, isMenuOpen ? 300 : 0);
    }
  }, [isMenuOpen, handleScroll]); // Added handleScroll here as well

  // --- Mobile Menu Specific Handlers ---
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isMenuOpen, closeMenu]);

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      closeMenu();
    }
  }, [closeMenu]);


  // --- Theme Classes (Unified for clarity) ---
  const themeColors = {
    // Navbar base
    bg: isDarkMode ? 'bg-gray-900/80' : 'bg-white/80',
    border: isDarkMode ? 'border-gray-700/20' : 'border-gray-200/30',
    shadow: isDarkMode ? 'shadow-2xl shadow-black/10' : 'shadow-2xl shadow-gray-900/5',

    // Text colors
    primaryText: isDarkMode ? 'text-gray-100' : 'text-gray-900',
    mutedText: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    highlightText: 'text-indigo-400', // For icons, etc.

    // Desktop Nav Menu specific
    desktopMenuBg: isDarkMode ? 'bg-gray-800/60' : 'bg-gray-50/60',
    desktopMenuItemHover: isDarkMode ? 'hover:bg-gray-700/30' : 'hover:bg-gray-100/50',
    desktopActiveItemBg: 'bg-gradient-to-r from-indigo-500 to-purple-600',
    desktopActiveItemShadow: 'shadow-lg shadow-indigo-500/25',

    // Mobile Drawer specific
    mobileDrawerBg: isDarkMode ? 'bg-gray-900/50' : 'bg-white/50', // More transparent background
    mobileDrawerGlassEffect: 'backdrop-blur-2xl saturate-100',
    mobileDrawerBorder: isDarkMode ? 'border-gray-700/30' : 'border-gray-200/30',
    mobileMenuItemActiveBg: 'bg-gradient-to-r from-indigo-500/80 to-purple-600/80', // More opaque active
    mobileMenuItemHoverBg: isDarkMode ? 'hover:bg-gray-800/20' : 'hover:bg-gray-100/20', // Subtle hover
    mobileMenuItemText: isDarkMode ? 'text-gray-100' : 'text-gray-900',
    mobileMenuItemTextHover: isDarkMode ? 'hover:text-white' : 'hover:text-gray-900',

    // Toggle buttons
    toggleButtonBg: isDarkMode ? 'bg-gray-800/50' : 'bg-white/50',
    toggleButtonHover: isDarkMode ? 'hover:bg-gray-700/70' : 'hover:bg-gray-100/70',

    // Logo specific
    logoGradient: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
  };


  return (
    <>
      {/* Conditionally render RemoveScroll to lock/unlock body scroll */}
      {isMenuOpen && <RemoveScroll allowTouchMove={true} />} {/* allowTouchMove allows scrolling within the menu */}

      {/* Floating cursor glow effect - hidden on mobile (adjust sizing if needed) */}
      {isHovered && (
        <div
          className="fixed pointer-events-none z-30 w-32 h-32 rounded-full opacity-40 transition-all duration-300 ease-out hidden lg:block"
          style={{
            left: mousePosition.x - 64,
            top: mousePosition.y - 64,
            background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, rgba(168,85,247,0.25) 50%, transparent 70%)',
            filter: 'blur(20px)',
            transform: 'scale(1.05)',
          }}
        />
      )}

      {/* Main Navbar Container */}
      <nav
        ref={navRef}
        className={cn(
          "fixed w-full z-50 transition-all duration-500 ease-out",
          isScrolled
            ? `py-2 sm:py-3 ${themeColors.bg}  ${themeColors.shadow} border-b ${themeColors.border}`
            : "py-3 sm:py-5 bg-transparent"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto flex items-center justify-between px-3 sm:px-4 lg:px-6 relative z-10">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleSmoothScroll(e, '#hero')}
            className={cn(
              "text-lg sm:text-xl lg:text-2xl font-bold flex items-center group cursor-pointer relative transition-all duration-300",
              
            )}
            aria-label="Eshan's Portfolio - Go to home"
          >
            <div className="relative">

              <div className="relative flex items-center">
                
                <span className="relative">
                  <span className={cn(
                    "bg-clip-text text-transparent  tracking-tight",
                    themeColors.logoGradient
                  )}>
                    Eshan's
                  </span>
                  <span className={cn(
                    "ml-1 sm:ml-2 transition-colors duration-300 font-medium ",
                    themeColors.primaryText
                  )}>
                    Portfolio
                  </span>
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className={cn(
            "hidden lg:flex items-center space-x-1 backdrop-blur-xl rounded-full p-1.5 border transition-all duration-300",
            themeColors.desktopMenuBg,
            themeColors.border
          )}>
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.href.substring(1);

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className={cn(
                    "relative flex items-center gap-2 px-3 xl:px-4 py-2 rounded-full transition-all duration-300 group cursor-pointer font-medium text-sm overflow-hidden",
                    isActive
                      ? `${themeColors.desktopActiveItemBg} text-white ${themeColors.desktopActiveItemShadow}`
                      : cn(themeColors.mutedText, themeColors.desktopMenuItemHover, 'hover:text-indigo-400')
                  )}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Active background glow */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-sm opacity-30 animate-pulse-slow-fade" />
                  )}
                  {/* Hover effect overlay */}
                  {!isActive && (
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-600/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    )} />
                  )}

                  <Icon
                    size={16}
                    className={cn(
                      "transition-transform duration-300 relative z-10",
                      isActive ? "scale-110 text-white" : "group-hover:scale-110 group-hover:text-indigo-400"
                    )}
                  />

                  <span className="relative z-10">{item.name}</span>
                </a>
              );
            })}

            {/* Dark Mode Toggle - Desktop */}
            <button
              onClick={toggleDarkMode}
              className={cn(
                "relative flex items-center gap-2 px-3 xl:px-4 py-2 rounded-full transition-all duration-300 group cursor-pointer ml-2 font-medium text-sm overflow-hidden",
                themeColors.mutedText,
                themeColors.desktopMenuItemHover,
                'hover:text-indigo-400'
              )}
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            >
              <div className="relative overflow-hidden w-4 h-4">
                <div className={cn(
                  "absolute inset-0 transition-all duration-500 ease-in-out",
                  isDarkMode ? "rotate-0 opacity-100" : "rotate-180 opacity-0"
                )}>
                  <Sun size={16} className="text-yellow-400" />
                </div>
                <div className={cn(
                  "absolute inset-0 transition-all duration-500 ease-in-out",
                  isDarkMode ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
                )}>
                  <Moon size={16} className="text-indigo-400" />
                </div>
              </div>

              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
                {isDarkMode ? 'Light' : 'Dark'}
              </span>
              {/* Hover effect overlay for toggle */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-600/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              )} />
            </button>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <button
            onClick={() => setIsMenuOpen(prev => !prev)}
            className={cn(
              "lg:hidden relative p-2 sm:p-3 z-50 transition-all duration-300 rounded-lg sm:rounded-xl group touch-manipulation",
              themeColors.primaryText,
              themeColors.toggleButtonBg,
              themeColors.toggleButtonHover,
              'border', themeColors.border,
              'shadow-md', isDarkMode ? 'shadow-black/20' : 'shadow-gray-300/20'
            )}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
          >
            <div className="relative w-6 h-6 sm:w-7 sm:h-7">
              {/* X icon for closing */}
              <div className={cn(
                "absolute inset-0 transition-all duration-300 flex items-center justify-center",
                isMenuOpen ? "rotate-0 opacity-100" : "rotate-90 opacity-0"
              )}>
                <X size={24} className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              {/* Menu icon for opening */}
              <div className={cn(
                "absolute inset-0 transition-all duration-300 flex items-center justify-center",
                isMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
              )}>
                <Menu size={24} className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
          </button>
        </div>

        {/* --- Enhanced Glassy Mobile Menu (Drawer) --- */}
        <div
          className={cn(
            "fixed inset-0 z-40 lg:hidden transition-all duration-500 ease-out",
            isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          {/* Fading transparent backdrop */}
          <div
            className={cn(
              "absolute inset-0",
              themeColors.mobileDrawerBg,
              isDarkMode ? "shadow-2xl shadow-black/20" : "shadow-2xl shadow-gray-900/10"
            )}
            style={{
              backdropFilter: `blur(${isMenuOpen ? '16px' : '0px'}) saturate(${isMenuOpen ? '150%' : '100%'})`,
              WebkitBackdropFilter: `blur(${isMenuOpen ? '16px' : '0px'}) saturate(${isMenuOpen ? '150%' : '100%'})`,
            }}
          />

          {/* Animated Glass Panel Drawer */}
          <div
            className={cn(
              "relative h-full transition-all duration-500 ease-out",
              isDarkMode
                ? "bg-gradient-to-br from-gray-900/40 via-gray-800/30 to-gray-900/40"
                : "bg-gradient-to-br from-white/40 via-gray-50/30 to-white/40",
              themeColors.mobileDrawerGlassEffect, // <<< THIS IS WHERE THE BLUR IS APPLIED
              `border-r ${themeColors.mobileDrawerBorder}`
            )}
            style={{
              width: 'min(80vw, 400px)',
              transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
              boxShadow: isMenuOpen ? (isDarkMode ? '8px 0 30px rgba(0,0,0,0.4)' : '8px 0 30px rgba(0,0,0,0.1)') : 'none',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header (Logo + Close Button) */}
            <div className="flex items-center justify-between p-4 sm:p-6 mb-4">
              <a
                href="#hero"
                onClick={(e) => {
                  handleSmoothScroll(e, '#hero');
                  closeMenu();
                }}
                className={cn(
                  "text-lg sm:text-xl font-bold flex items-center group cursor-pointer relative transition-all duration-300",
                  themeColors.primaryText
                )}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-1.5 sm:p-2 mr-2 sm:mr-3 shadow-lg">
                </div>
                <span className={cn(
                  "bg-clip-text text-transparent font-extrabold tracking-tight",
                  themeColors.logoGradient
                )}>
                  Eshan
                </span>
              </a>

              {/* Close button in top-right corner */}
              <button
                onClick={closeMenu}
                className={cn(
                  "p-2 sm:p-3 rounded-full transition-all duration-300 touch-manipulation z-50",
                  themeColors.toggleButtonBg,
                  themeColors.toggleButtonHover,
                  themeColors.primaryText,
                  'border', themeColors.border,
                  'shadow-md', isDarkMode ? 'shadow-black/20' : 'shadow-gray-300/20'
                )}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Menu content */}
            <div className="flex flex-col space-y-3 sm:space-y-4 px-4 sm:px-6">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href.substring(1);

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className={cn(
                      "flex items-center gap-3 sm:gap-4 py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl transition-all duration-300 cursor-pointer group relative touch-manipulation overflow-hidden",
                      isActive
                        ? `${themeColors.mobileMenuItemActiveBg} text-white shadow-xl shadow-indigo-500/20`
                        : cn(themeColors.mobileMenuItemText, themeColors.mobileMenuItemHoverBg, themeColors.mobileMenuItemTextHover)
                    )}
                    style={{
                      transform: isMenuOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
                      opacity: isMenuOpen ? 1 : 0,
                      transition: `all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${isMenuOpen ? (0.1 + index * 0.05) : 0}s`,
                      backdropFilter: isActive ? 'blur(8px)' : 'blur(0px)',
                      WebkitBackdropFilter: isActive ? 'blur(8px)' : 'blur(0px)',
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {/* Inner active glow for mobile items */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur-sm opacity-30 animate-pulse-slow-fade" />
                    )}
                    {/* Hover glow for mobile items */}
                    {!isActive && (
                      <div className={cn(
                        "absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      )} />
                    )}

                    <Icon size={20} className={cn(
                      "sm:w-6 sm:h-6 relative z-10 flex-shrink-0",
                      isActive ? "text-white" : themeColors.highlightText
                    )} />
                    <span className="font-medium relative z-10 flex-1 text-base sm:text-lg">{item.name}</span>
                    {isActive && <ChevronRight size={18} className="sm:w-5 sm:h-5 relative z-10 flex-shrink-0 text-white" />}
                  </a>
                );
              })}

              {/* Mobile Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={cn(
                  "flex items-center gap-3 sm:gap-4 py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl transition-all duration-300 cursor-pointer group relative touch-manipulation overflow-hidden",
                  themeColors.mobileMenuItemText,
                  themeColors.mobileMenuItemHoverBg,
                  themeColors.mobileMenuItemTextHover
                )}
                style={{
                  transform: isMenuOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
                  opacity: isMenuOpen ? 1 : 0,
                  transition: `all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${isMenuOpen ? (0.1 + navItems.length * 0.05) : 0}s`,
                  backdropFilter: 'blur(0px)',
                  WebkitBackdropFilter: 'blur(0px)',
                }}
                aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              >
                {/* Hover glow */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                )} />
                <div className="relative overflow-hidden w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0">
                  <div className={cn(
                    "absolute inset-0 transition-all duration-500 ease-in-out",
                    isDarkMode ? "rotate-0 opacity-100" : "rotate-180 opacity-0"
                  )}>
                    <Sun size={20} className="sm:w-6 sm:h-6 text-yellow-400" />
                  </div>
                  <div className={cn(
                    "absolute inset-0 transition-all duration-500 ease-in-out",
                    isDarkMode ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
                  )}>
                    <Moon size={20} className="sm:w-6 sm:h-6 text-indigo-400" />
                  </div>
                </div>

                <span className="font-medium relative z-10 flex-1 text-base sm:text-lg">
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
              </button>
            </div>

            {/* Mobile menu footer */}
            <div className="mt-8 px-4 sm:px-6">
              <div
                className={cn(
                  "flex justify-center items-center gap-2 text-sm font-medium",
                  themeColors.mutedText
                )}
                style={{
                  transform: isMenuOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
                  opacity: isMenuOpen ? 1 : 0,
                  transition: `all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${isMenuOpen ? (0.1 + navItems.length * 0.05 + 0.1) : 0}s`
                }}
              >
                <span>Eshan&apos;s Portfolio</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Scroll progress indicator */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 to-purple-600 z-50 origin-left transition-transform duration-100 ease-out shadow-lg shadow-indigo-500/50"
        style={{
          transform: `scaleX(${scrollProgress})`
        }}
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </>
  );
};

export default Navbar;
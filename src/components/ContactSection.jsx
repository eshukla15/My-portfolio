import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
  Twitter,
  User,
  MessageCircle,
  Sparkles,
  Zap,
  Heart,
  Star,
  Moon,
  Sun,
} from "lucide-react";
import React from "react";
import { useState, useEffect, useRef } from "react";

export const ContactSection = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const sectionRef = useRef();
  const titleRef = useRef();
  const leftPanelRef = useRef();
  const rightPanelRef = useRef();

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Particle system
  useEffect(() => {
    const createParticle = () => ({
      id: Math.random(),
      x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
      y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
      opacity: Math.random() * 0.8 + 0.2,
      color: ["#00bcd4", "#9c27b0", "#e91e63", "#ff9800"][Math.floor(Math.random() * 4)],
    });

    const initialParticles = Array.from({ length: 50 }, createParticle);
    setParticles(initialParticles);

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((particle) => {
          const newX = particle.x + particle.speedX;
          const newY = particle.y + particle.speedY;
          const width = typeof window !== "undefined" ? window.innerWidth : 1200;
          const height = typeof window !== "undefined" ? window.innerHeight : 800;

          return {
            ...particle,
            x: newX > width ? 0 : newX < 0 ? width : newX,
            y: newY > height ? 0 : newY < 0 ? height : newY,
          };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateSection();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const themeClasses = {
    background: isDarkMode ? "bg-gray-900" : "bg-gray-50",
    text: {
      primary: isDarkMode ? "text-white" : "text-gray-900",
      secondary: isDarkMode ? "text-gray-300" : "text-gray-600",
      muted: isDarkMode ? "text-gray-400" : "text-gray-500",
    },
    card: isDarkMode ? "bg-white/5 border-white/10" : "bg-white/80 border-gray-200/50",
    cardHover: isDarkMode ? "hover:border-white/20" : "hover:border-gray-300/70",
    input: isDarkMode ? "bg-white/5 border-white/10 text-white" : "bg-white/90 border-gray-200 text-gray-900",
    inputHover: isDarkMode ? "hover:bg-white/10 group-hover:border-white/20" : "hover:bg-white group-hover:border-gray-300",
    inputFocus: isDarkMode ? "focus:ring-cyan-400 focus:border-cyan-400" : "focus:ring-blue-500 focus:border-blue-500",
    placeholder: isDarkMode ? "placeholder-gray-500" : "placeholder-gray-400",
    gradient: isDarkMode ? "from-cyan-500/10 to-purple-600/10" : "from-blue-500/10 to-purple-500/10",
    gradientBorder: isDarkMode ? "border-cyan-500/20" : "border-blue-500/20",
  };

  const animateSection = () => {
    if (titleRef.current) {
      titleRef.current.style.opacity = "1";
      titleRef.current.style.transform = "translateY(0) scale(1)";
    }

    if (leftPanelRef.current) {
      setTimeout(() => {
        leftPanelRef.current.style.opacity = "1";
        leftPanelRef.current.style.transform = "translateX(0) rotateY(0)";
      }, 300);
    }

    if (rightPanelRef.current) {
      setTimeout(() => {
        rightPanelRef.current.style.opacity = "1";
        rightPanelRef.current.style.transform = "translateX(0) rotateY(0)";
      }, 600);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ... (rest of your code)

const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent default form submission behavior

  if (!formData.name || !formData.email || !formData.message) {
    alert("Please fill in all fields.");
    return;
  }

  setIsSubmitting(true);

  // CORRECTED LINE: Use import.meta.env for Vite and modern setups
  // If you are using Create React App (older versions), you might still need process.env.REACT_APP_BREVO_API_KEY
  // but for the "process is not defined" error, import.meta.env is the solution.
  const brevoApiKey = import.meta.env.VITE_BREVO_API_KEY; 

  if (!brevoApiKey) {
    console.error("Brevo API key is not defined. Please set VITE_BREVO_API_KEY in your .env file.");
    alert("Error: Email service not configured. Please ensure the API key is set correctly.");
    setIsSubmitting(false);
    return;
  }

  const emailData = {
  // Use your verified Brevo sender email here
  sender: { name: "Your Portfolio", email: "eshukla15@gmail.com" },
  // The recipient remains your email
  to: [{ email: "eshukla15@gmail.com", name: "Eshan Shukla" }],
  // Adjust subject to include user's name
  subject: `New Message from ${formData.name} (Portfolio Contact)`,
  htmlContent: `
    <div style="font-family: Arial, sans-serif; font-size: 15px; color: #333;">
        <h2 style="margin-bottom: 0;">📩 New Message from Your Portfolio!</h2>
        <hr style="margin: 10px 0;" />
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
        <hr style="margin: 20px 0;" />
        <p style="white-space: pre-line;"><strong>Message:</strong><br/>${formData.message}</p>
        <br/>
        <p>Best regards,</p>
        <p>${formData.name}</p>
    </div>
  `,
};

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": brevoApiKey,
        Accept: "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (response.ok) {
      setShowSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setShowSuccess(false), 5000);
    } else {
      const errorData = await response.json();
      console.error("Brevo API error:", errorData);
      alert(`Failed to send message. Error: ${errorData.message || 'Unknown error'}. Please try again or contact me directly at eshukla15@gmail.com`);
    }
  } catch (error) {
    console.error("Network or API call error:", error);
    alert("There was a problem sending your message. Please try again or contact me directly at eshukla15@gmail.com");
  } finally {
    setIsSubmitting(false);
  }
};

// ... (rest of your component)
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative py-8 sm:py-12 md:py-20 px-4 md:px-6 min-h-screen overflow-hidden ${themeClasses.background} transition-colors duration-500`}
      style={{
        perspective: "1000px",
        background: "transparent",
      }}
    >
      {/* Theme Toggle Button */}

      {/* Animated Background Particles - Hidden on mobile for performance */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full blur-sm animate-pulse"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity * (isDarkMode ? 0.3 : 0.15),
              transform: `translate(-50%, -50%)`,
            }}
          />
        ))}
      </div>

      {/* Dynamic cursor light effect - Desktop only */}
      <div
        className="fixed pointer-events-none z-0 transition-opacity duration-300 hidden md:block"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: "600px",
          height: "600px",
          background: isDarkMode
            ? "radial-gradient(circle, rgba(0,188,212,0.1) 0%, rgba(156,39,176,0.05) 50%, transparent 70%)"
            : "radial-gradient(circle, rgba(59,130,246,0.08) 0%, rgba(147,51,234,0.04) 50%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          opacity: isHovered ? 0.8 : 0.3,
        }}
      />

      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Enhanced Title Section */}
        <div
          ref={titleRef}
          className="text-center mb-8 sm:mb-12 md:mb-16 opacity-0 transition-all duration-1000 ease-out"
          style={{ transform: "translateY(50px) scale(0.9)" }}
        >
          <div className="relative inline-block">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Let's <span className="text-primary"> Connect</span>
        </h2>
            
          </div>
          <p className={`text-sm sm:text-base md:text-lg ${themeClasses.text.secondary} max-w-3xl mx-auto leading-relaxed px-4`}>
            Feel free to reach out for collaborations, inquiries, or just a friendly hello! Whether you have a project in mind or simply want to connect, I'm always open to new opportunities and conversations.
          </p>
          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
          {/* Enhanced Contact Info Panel */}
          <div
            ref={leftPanelRef}
            className="space-y-4 sm:space-y-6 md:space-y-8 opacity-0 transition-all duration-1000 ease-out order-2 lg:order-1"
            style={{
              transform: "translateX(-50px) rotateY(10deg)",
              transformStyle: "preserve-3d",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Contact Information */}
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <ContactInfo
                icon={<Mail className="text-cyan-400" size={18} />}
                label="Email"
                value="eshukla15@gmail.com"
                link="mailto:eshukla15@gmail.com"
                delay="0ms"
                themeClasses={themeClasses}
              />
              <ContactInfo
                icon={<Phone className="text-purple-400" size={18} />}
                label="Phone"
                value="  +91 9336220936"
                link="tel:+919336220936"
                delay="200ms"
                themeClasses={themeClasses}
              />
              <ContactInfo
                icon={<MapPin className="text-blue" size={18} />}
                label="Location"
                value="Ghaziabad, UP, India"
                delay="400ms"
                themeClasses={themeClasses}
              />
            </div>

           

            {/* Fun Call-to-Action */}
            <div
              className={`mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r ${themeClasses.gradient} rounded-2xl border ${themeClasses.gradientBorder} backdrop-blur-sm`}
            >
              <div className="flex items-center gap-3 mb-2">
              </div>
              <p className={`${themeClasses.text.secondary} text-bold `}>I'll get back to you as soon as possible!</p>
            </div>
          </div>

          {/* Enhanced Contact Form Panel */}
          <div
            ref={rightPanelRef}
            className="opacity-0 transition-all duration-1000 ease-out order-1 lg:order-2"
            style={{
              transform: "translateX(50px) rotateY(-10deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className={`${themeClasses.card} backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-2xl border ${themeClasses.cardHover} transition-all duration-500 hover:shadow-xl ${
                isDarkMode ? "hover:shadow-purple-500/10" : "hover:shadow-blue-500/10"
              } relative group`}
            >
              {/* Enhanced 3D hover effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${themeClasses.gradient} rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Floating elements - Hidden on mobile */}
              <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-bounce opacity-20 hidden sm:block"></div>
              <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-pink-400 to-yellow-500 rounded-full animate-bounce delay-1000 opacity-20 hidden sm:block"></div>

              <div className="relative z-10">
                <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 ${themeClasses.text.primary} flex items-center gap-2 sm:gap-3`}>
                  <Send className="text-cyan-400 animate-pulse" size={20} />
                  Send Message
                </h3>
                <p className={`${themeClasses.text.muted} mb-4 sm:mb-6 text-sm sm:text-base`}>Just a step away!</p>

                {/* Enhanced Success Message */}
                {showSuccess && (
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-500/10 border border-green-500/20 rounded-xl backdrop-blur-sm animate-pulse">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full animate-ping"></div>
                      <p className="text-green-400 text-xs sm:text-sm font-medium">✅ Message sent! I'll respond soon!</p>
                    </div>
                  </div>
                )}

                <div className="space-y-4 sm:space-y-6">
                  <InputField
                    label="Name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    icon={<User size={14} />}
                    themeClasses={themeClasses}
                  />
                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    icon={<Mail size={14} />}
                    themeClasses={themeClasses}
                  />
                  <InputField
                    label="Message"
                    name="message"
                    isTextarea
                    placeholder="Type your message"
                    value={formData.message}
                    onChange={handleInputChange}
                    icon={<MessageCircle size={14} />}
                    themeClasses={themeClasses}
                  />

                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                      isDarkMode
                        ? "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500"
                    } transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${
                      isDarkMode ? "hover:shadow-purple-500/25" : "hover:shadow-blue-500/25"
                    } text-white disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 relative overflow-hidden group text-sm sm:text-base`}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                        <span className="sm:hidden">Sending...</span>
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={16} />
                      </>
                    )}
                  </button>

                  <p className={`text-xs ${themeClasses.text.muted} text-center mt-2`}>
                    Your message will be sent directly to my inbox.
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

const ContactInfo = ({ icon, label, value, link, delay, themeClasses }) => (
  <div
    className={`flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl ${themeClasses.card} backdrop-blur-sm border ${themeClasses.cardHover} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg transform-gpu group relative overflow-hidden`}
    style={{ animationDelay: delay }}
  >
    <div className={`absolute inset-0 bg-gradient-to-r ${themeClasses.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
    <div className="p-2 sm:p-3 bg-gradient-to-br from-cyan-400/20 to-purple-600/20 rounded-xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
      {icon}
    </div>
    <div className="relative z-10 min-w-0">
      <h4 className={`font-semibold ${themeClasses.text.primary} mb-1 text-sm sm:text-base`}>{label}</h4>
      {link ? (
        <a
          href={link}
          className={`${themeClasses.text.secondary} hover:text-cyan-400 transition-colors duration-300 flex items-center gap-1 text-xs sm:text-sm break-all`}
        >
          <span className="break-all">{value}</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">→</span>
        </a>
      ) : (
        <p className={`${themeClasses.text.secondary} text-xs sm:text-sm`}>{value}</p>
      )}
    </div>
  </div>
);

const SocialIcon = ({ href, icon, color, label }) => (
  <div className="group relative">
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-lg transform-gpu relative overflow-hidden`}
    >
      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">{icon}</div>
    </a>
    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-20">
      {label}
    </div>
  </div>
);

const InputField = ({ label, name, placeholder, type = "text", isTextarea = false, value, onChange, icon, themeClasses }) => (
  <div className="group relative">
    <label
      htmlFor={name}
      className={`block text-xs sm:text-sm font-medium mb-2 ${themeClasses.text.primary} flex items-center gap-2 group-hover:text-cyan-400 transition-colors duration-300`}
    >
      <span className="group-hover:animate-pulse">{icon}</span>
      {label}
    </label>
    {isTextarea ? (
      <textarea
        id={name}
        name={name}
        required
        value={value}
        onChange={onChange}
        rows={4}
        className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border ${themeClasses.input} ${themeClasses.placeholder} ${themeClasses.inputFocus} focus:outline-none resize-none transition-all duration-300 ${themeClasses.inputHover} text-xs sm:text-sm`}
        placeholder={placeholder}
      />
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        required
        value={value}
        onChange={onChange}
        className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border ${themeClasses.input} ${themeClasses.placeholder} ${themeClasses.inputFocus} focus:outline-none transition-all duration-300 ${themeClasses.inputHover} text-xs sm:text-sm`}
        placeholder={placeholder}
      />
    )}
  </div>
);
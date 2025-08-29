import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown } from "lucide-react";
import * as THREE from 'three';

export const HeroSection = ({ isDarkMode = true }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const frameRef = useRef(null);
  const meshesRef = useRef([]);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [textGlitch, setTextGlitch] = useState(false);

  // Theme-based colors
  const themeColors = {
    dark: {
      geometryColors: [0x3b82f6, 0x8b5cf6, 0x06b6d4, 0x10b981, 0xf59e0b, 0xef4444],
      emissiveColors: [0x1e40af, 0x7c3aed, 0x0891b2, 0x059669, 0xd97706, 0xdc2626],
      textColors: 'text-white',
      subtextColors: 'text-gray-300',
      scrollText: 'text-gray-400'
    },
    light: {
      geometryColors: [0x1e40af, 0x7c3aed, 0x0891b2, 0x059669, 0xd97706, 0xdc2626],
      emissiveColors: [0x3b82f6, 0x8b5cf6, 0x06b6d4, 0x10b981, 0xf59e0b, 0xef4444],
      textColors: 'text-gray-900',
      subtextColors: 'text-gray-600',
      scrollText: 'text-gray-500'
    }
  };

  const currentTheme = isDarkMode ? themeColors.dark : themeColors.light;

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced geometries with more complex shapes
    const geometries = [
      new THREE.OctahedronGeometry(0.3),
      new THREE.TetrahedronGeometry(0.4),
      new THREE.IcosahedronGeometry(0.25),
      new THREE.DodecahedronGeometry(0.35),
      new THREE.ConeGeometry(0.3, 0.8, 6),
      new THREE.CylinderGeometry(0.2, 0.4, 0.6, 8),
      new THREE.TorusGeometry(0.3, 0.1, 8, 16),
      new THREE.TorusKnotGeometry(0.2, 0.08, 64, 8),
    ];

    // Dynamic materials based on theme
    const materials = currentTheme.geometryColors.map((color, index) =>
      new THREE.MeshStandardMaterial({
        color: color,
        emissive: currentTheme.emissiveColors[index % currentTheme.emissiveColors.length],
        emissiveIntensity: isDarkMode ? 0.3 : 0.1,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: isDarkMode ? 0.8 : 0.6
      })
    );

    // Create floating meshes with more variety
    const meshes = [];
    for (let i = 0; i < 16; i++) {
      const geometry = geometries[i % geometries.length];
      const material = materials[i % materials.length];
      const mesh = new THREE.Mesh(geometry, material);

      // More dynamic positioning
      mesh.position.set(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 12 - 6
      );

      // Random rotation
      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      // Enhanced animation data
      mesh.userData = {
        initialPosition: mesh.position.clone(),
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.03,
          y: (Math.random() - 0.5) * 0.03,
          z: (Math.random() - 0.5) * 0.03
        },
        floatSpeed: Math.random() * 0.012 + 0.008,
        floatRange: Math.random() * 3 + 1.5,
        morphSpeed: Math.random() * 0.01 + 0.005,
        scaleBase: Math.random() * 0.3 + 0.8
      };

      scene.add(mesh);
      meshes.push(mesh);
    }

    // Add particle system
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 50;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 30;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 20;

      // Theme-based particle colors
      const color = new THREE.Color(currentTheme.geometryColors[i % currentTheme.geometryColors.length]);
      particleColors[i3] = color.r;
      particleColors[i3 + 1] = color.g;
      particleColors[i3 + 2] = color.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: isDarkMode ? 0.05 : 0.03,
      vertexColors: true,
      transparent: true,
      opacity: isDarkMode ? 0.6 : 0.4,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Enhanced lighting system
    const ambientLight = new THREE.AmbientLight(0x404040, isDarkMode ? 0.6 : 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, isDarkMode ? 1 : 1.2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Multiple colored point lights
    const pointLights = [];
    const lightColors = currentTheme.geometryColors.slice(0, 4);

    lightColors.forEach((color, index) => {
      const light = new THREE.PointLight(color, isDarkMode ? 1 : 0.8, 100);
      const angle = (index / lightColors.length) * Math.PI * 2;
      light.position.set(
        Math.cos(angle) * 15,
        Math.sin(angle) * 10,
        Math.sin(angle) * 15
      );
      scene.add(light);
      pointLights.push({ light, angle: angle, radius: 15 });
    });

    // Camera positioning
    camera.position.z = 12;

    // Enhanced mouse interaction
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Enhanced animation loop
    const animate = (time) => {
      // Animate meshes with more complex motion
      meshes.forEach((mesh, index) => {
        // Continuous rotation with variation
        mesh.rotation.x += mesh.userData.rotationSpeed.x;
        mesh.rotation.y += mesh.userData.rotationSpeed.y;
        mesh.rotation.z += mesh.userData.rotationSpeed.z;

        // Complex floating motion
        const floatOffset = Math.sin(time * 0.001 * mesh.userData.floatSpeed) * mesh.userData.floatRange;
        const secondaryFloat = Math.cos(time * 0.0008 * mesh.userData.floatSpeed) * (mesh.userData.floatRange * 0.5);
        mesh.position.y = mesh.userData.initialPosition.y + floatOffset + secondaryFloat;

        // Orbital motion
        const orbitRadius = 2;
        const orbitSpeed = 0.0003;
        mesh.position.x = mesh.userData.initialPosition.x + Math.cos(time * orbitSpeed + index) * orbitRadius + mouseRef.current.x * 0.8;
        mesh.position.z = mesh.userData.initialPosition.z + Math.sin(time * orbitSpeed + index) * orbitRadius + mouseRef.current.y * 0.8;

        // Dynamic scaling with morphing
        const baseScale = mesh.userData.scaleBase;
        const morphScale = 1 + Math.sin(time * 0.002 + index) * 0.15;
        const mouseScale = 1 + Math.abs(mouseRef.current.x * mouseRef.current.y) * 0.2;
        mesh.scale.setScalar(baseScale * morphScale * mouseScale);

        // Material animation
        mesh.material.emissiveIntensity = (isDarkMode ? 0.3 : 0.1) + Math.sin(time * 0.003 + index) * 0.1;
      });

      // Animate particles
      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(time * 0.001 + i) * 0.01;
        positions[i3] += Math.cos(time * 0.0008 + i) * 0.008;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Enhanced camera movement
      camera.position.x = Math.sin(time * 0.0005) * 0.8 + mouseRef.current.x * 0.5;
      camera.position.y = Math.cos(time * 0.0007) * 0.6 + mouseRef.current.y * 0.3;
      camera.position.z = 12 + Math.sin(time * 0.0003) * 0.5;
      camera.lookAt(0, 0, 0);

      // Animate point lights in complex patterns
      pointLights.forEach((lightData, index) => {
        const { light, angle, radius } = lightData;
        const timeOffset = time * 0.001 + angle;
        light.position.x = Math.sin(timeOffset) * radius * (1 + Math.sin(time * 0.0003) * 0.3);
        light.position.y = Math.cos(timeOffset * 0.7) * radius * 0.8;
        light.position.z = Math.cos(timeOffset) * radius * (1 + Math.cos(time * 0.0004) * 0.3);
        light.intensity = (isDarkMode ? 1 : 0.8) + Math.sin(time * 0.002 + index) * 0.2;
      });

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Start animation
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Store refs
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;
    meshesRef.current = meshes;
    particlesRef.current = particles;

    // Start animation and set loaded state
    frameRef.current = requestAnimationFrame(animate);
    setTimeout(() => setIsLoaded(true), 500);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      // Dispose of Three.js objects
      geometries.forEach(geo => geo.dispose());
      materials.forEach(mat => mat.dispose());
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [isDarkMode]);

  // Glitch effect for text
  useEffect(() => {
    const interval = setInterval(() => {
      setTextGlitch(true);
      setTimeout(() => setTextGlitch(false), 150);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Three.js Canvas */}
      <div
        ref={mountRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Content */}
      <div className="container max-w-4xl mx-auto text-center z-10 relative" style={{ zIndex: 2 }}>
        <div className="space-y-8">
          {/* Main heading with glitch effect */}
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight leading-tight">
            <span
              className={`inline-block transform transition-all duration-1000 ease-out ${currentTheme.textColors} ${isLoaded ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-12 rotate-12'
                }`}
              style={{
                animationDelay: '0ms',
                textShadow: isDarkMode ? '0 0 20px rgba(59, 130, 246, 0.5)' : '0 0 20px rgba(59, 130, 246, 0.2)'
              }}
            >
              Hi, I'm
            </span>
            <span
              className={`inline-block transform transition-all duration-1000 ease-out ml-4 ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-150'
                } ${textGlitch ? 'animate-pulse' : ''}`}
              style={{
                animationDelay: '200ms',
                background: isDarkMode
                  ? 'linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4, #f59e0b)'
                  : 'linear-gradient(45deg, #1e40af, #7c3aed, #0891b2, #d97706)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundSize: '200% 200%',
                animation: 'gradient-flow 3s ease infinite',
                textShadow: isDarkMode ? '0 0 30px rgba(139, 92, 246, 0.6)' : '0 0 30px rgba(139, 92, 246, 0.3)',
                filter: textGlitch ? 'hue-rotate(90deg)' : 'none'
              }}
            >
              Eshan
            </span>
            <span
              className={`inline-block transform transition-all duration-1000 ease-out ml-2 ${isLoaded ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-20 -rotate-12'
                }`}
              style={{
                animationDelay: '400ms',
                background: isDarkMode
                  ? 'linear-gradient(135deg, #10b981, #06b6d4, #3b82f6, #ef4444)'
                  : 'linear-gradient(135deg, #059669, #0891b2, #1e40af, #dc2626)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundSize: '200% 200%',
                animation: 'gradient-flow 4s ease infinite reverse',
                textShadow: isDarkMode ? '0 0 25px rgba(16, 185, 129, 0.5)' : '0 0 25px rgba(16, 185, 129, 0.3)'
              }}
            >
              Shukla
            </span>
          </h1>

          {/* Enhanced animated subtitle */}
          <div className="relative">
            <p
              className={`text-lg md:text-2xl ${currentTheme.subtextColors} max-w-3xl mx-auto transform transition-all duration-1200 ease-out ${isLoaded ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'
                }`}
              style={{
                animationDelay: '600ms',
                textShadow: isDarkMode ? '0 2px 10px rgba(0, 0, 0, 0.3)' : '0 2px 10px rgba(0, 0, 0, 0.1)'
              }}
            >
              about me info to be added
            </p>
          </div>

          {/* Enhanced CTA button with theme support */}
          <div
            className={`pt-8 transform transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-90'
              }`}
            style={{ animationDelay: '800ms' }}
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-1 active:scale-95"
              style={{
                background: isDarkMode
                  ? 'linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4, #10b981)'
                  : 'linear-gradient(45deg, #1e40af, #7c3aed, #0891b2, #059669)',
                backgroundSize: '300% 300%',
                animation: 'gradient-shift 3s ease infinite',
                borderRadius: '50px',
                boxShadow: isDarkMode
                  ? '0 10px 30px rgba(59, 130, 246, 0.4), 0 0 50px rgba(139, 92, 246, 0.2)'
                  : '0 10px 30px rgba(59, 130, 246, 0.3), 0 0 50px rgba(139, 92, 246, 0.1)',
                border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <span className="relative z-10 flex items-center">
                View My Work
                <svg
                  className="ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        style={{
          animationDelay: '1000ms',
          animation: 'float 3s ease-in-out infinite'
        }}
      >
        <span className={`text-sm ${currentTheme.scrollText} mb-3 font-medium tracking-wide`}>
          Scroll to explore
        </span>
        <div className="relative">
          <ArrowDown
            className={`h-6 w-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} relative z-10`}
            style={{
              filter: isDarkMode
                ? 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.6))'
                : 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.4))',
              animation: 'bounce 2s infinite'
            }}
          />
          <div className={`absolute inset-0 h-6 w-6 ${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'} rounded-full blur-lg ${isDarkMode ? 'opacity-40' : 'opacity-20'} animate-pulse`} />
        </div>
      </div>

      {/* Enhanced CSS Keyframes */}
      <style>{`
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
        
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </section>
  );
};
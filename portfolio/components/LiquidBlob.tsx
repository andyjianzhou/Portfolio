"use client"

import { useState, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"

function LiquidBlobMesh() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [currentSection, setCurrentSection] = useState('home')

  // Track which section we're in
  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById('home')
      const aboutSection = document.getElementById('about')
      
      if (!homeSection || !aboutSection) return
      
      const scrollY = window.scrollY
      const homeHeight = homeSection.offsetHeight
      const aboutTop = aboutSection.offsetTop
      
      if (scrollY < homeHeight * 0.7) {
        setCurrentSection('home')
      } else if (scrollY >= aboutTop - 200) {
        setCurrentSection('about')
      } else {
        setCurrentSection('transition')
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Create high-resolution sphere geometry for smooth deformation
  const geometry = new THREE.SphereGeometry(2, 128, 64)

  // Custom shader material for liquid effect
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uScrollY: { value: 0 },
      uColorTransition: { value: 0 }, // 0 = silver/gray, 1 = black
    },
    vertexShader: `
      uniform float uTime;
      uniform float uScrollY;
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      // Smooth noise function for organic deformation
      vec3 mod289(vec3 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
      }
      
      vec4 mod289(vec4 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
      }
      
      vec4 permute(vec4 x) {
        return mod289(((x*34.0)+1.0)*x);
      }
      
      vec4 taylorInvSqrt(vec4 r) {
        return 1.79284291400159 - 0.85373472095314 * r;
      }
      
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        
        vec3 i = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        
        i = mod289(i);
        vec4 p = permute(permute(permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        
        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        
        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
        
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }
      
      void main() {
        vNormal = normal;
        vPosition = position;
        
        vec3 pos = position;
        float scrollInfluence = uScrollY * 0.001;
        
        // Create smooth, flowing liquid deformation with multiple noise layers
        float noise1 = snoise(pos * 0.8 + uTime * 0.3) * 0.15;
        float noise2 = snoise(pos * 1.5 + uTime * 0.2) * 0.08;
        float noise3 = snoise(pos * 2.2 + uTime * 0.4) * 0.05;
        
        // Combine noise layers for organic liquid movement
        float displacement = noise1 + noise2 + noise3;
        
        // Apply smooth deformation along normal for liquid effect
        pos += normal * displacement * (1.0 + scrollInfluence);
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uScrollY;
      uniform float uColorTransition;
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      void main() {
        vec3 viewDirection = normalize(cameraPosition - vPosition);
        
        // Even ambient lighting from multiple angles to eliminate harsh sides
        vec3 light1 = normalize(vec3(1.0, 1.0, 1.0));
        vec3 light2 = normalize(vec3(-1.0, 1.0, 1.0));
        vec3 light3 = normalize(vec3(1.0, -1.0, 1.0));
        vec3 light4 = normalize(vec3(-1.0, -1.0, 1.0));
        
        // Soft, even lighting from all directions
        float lighting = (dot(vNormal, light1) + 
                         dot(vNormal, light2) + 
                         dot(vNormal, light3) + 
                         dot(vNormal, light4)) * 0.25;
        
        // Normalize lighting to prevent extreme values
        lighting = lighting * 0.5 + 0.5;
        
        // Enhanced specular highlights for more pop
        vec3 reflectDir = reflect(-viewDirection, vNormal);
        float specular = pow(max(0.0, dot(viewDirection, reflectDir)), 12.0) * 0.6;
        
        // Subtle fresnel rim lighting for definition
        float fresnel = pow(1.0 - max(0.0, dot(viewDirection, vNormal)), 2.0) * 0.3;
        
        // Create organic surface variation based on the liquid deformation
        float surfaceNoise = sin(vPosition.x * 4.0 + uTime * 0.3) * 
                            cos(vPosition.y * 3.5 + uTime * 0.4) * 
                            sin(vPosition.z * 3.0 + uTime * 0.2) * 0.15;
        
        // Combine lighting factors with more contrast
        float totalLight = lighting + specular + fresnel + surfaceNoise;
        
        // More dramatic contrast to make it pop
        float colorMix = smoothstep(0.1, 0.9, totalLight);
        
        // Define color palettes for different sections
        // Silver/Gray palette (home section)
        vec3 silverDark = vec3(0.08, 0.08, 0.08);
        vec3 silverLight = vec3(0.9, 0.9, 0.9);
        
        // Dark Gray palette (about section) - more sophisticated than pure black
        vec3 grayDark = vec3(0.12, 0.12, 0.12);   // Subtle dark gray
        vec3 grayLight = vec3(0.35, 0.35, 0.35);  // Medium gray highlights
        
        // Interpolate between palettes based on section
        vec3 darkColor = mix(silverDark, grayDark, uColorTransition);
        vec3 lightColor = mix(silverLight, grayLight, uColorTransition);
        
        vec3 baseColor = mix(darkColor, lightColor, colorMix);
        
        // Add subtle specular highlights - maintain some shine in dark mode
        float specularIntensity = mix(0.4, 0.25, uColorTransition);
        vec3 finalColor = baseColor + specular * vec3(specularIntensity, specularIntensity, specularIntensity);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `,
    transparent: false,
    side: THREE.DoubleSide,
  })

  useFrame((state) => {
    if (meshRef.current && meshRef.current.material) {
      const mat = meshRef.current.material as THREE.ShaderMaterial
      mat.uniforms.uTime.value = state.clock.elapsedTime
      mat.uniforms.uScrollY.value = window.scrollY || 0

      // Smooth color transition based on current section
      let targetTransition = 0
      if (currentSection === 'about') {
        targetTransition = 1 // Black
      } else if (currentSection === 'transition') {
        targetTransition = 0.5 // Mid-transition
      } else {
        targetTransition = 0 // Silver/Gray
      }

      // Smoothly interpolate to target color
      const currentTransition = mat.uniforms.uColorTransition.value
      mat.uniforms.uColorTransition.value = THREE.MathUtils.lerp(
        currentTransition,
        targetTransition,
        0.05 // Smooth transition speed
      )

      // Tumbling across the screen with scroll
      const scrollY = window.scrollY || 0
      const scrollFactor = scrollY * 0.001
      
      // Add tumbling rotation as you scroll
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1 + scrollFactor * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1 + scrollFactor * 0.8
      meshRef.current.rotation.z = scrollFactor * 0.3 // Z-axis tumbling
      
      // Tumble across the screen horizontally as you scroll
      const horizontalMovement = Math.sin(scrollFactor * 0.4) * 1.5 // Sine wave movement across screen
      meshRef.current.position.x = horizontalMovement
      
      // Gentle vertical floating + slight bounce from scroll
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2 + Math.sin(scrollFactor * 0.6) * 0.2
    }
  })

  return <mesh ref={meshRef} geometry={geometry} material={material} position={[0, 0, 0]} />
}

// Mobile-friendly CSS-only blob alternative
function MobileBlobAlternative() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {/* Animated CSS blob with gradient */}
      <div className="mobile-liquid-blob relative w-96 h-96 rounded-full opacity-85">
        {/* Main blob shape */}
        <div className="absolute inset-0 bg-gradient-radial from-gray-200 via-gray-400 to-gray-600 rounded-full animate-blob-pulse" />
        
        {/* Additional morphing layers for liquid effect */}
        <div className="absolute inset-4 bg-gradient-radial from-white/30 to-transparent rounded-full animate-blob-morph delay-200" />
        <div className="absolute inset-8 bg-gradient-radial from-gray-300/40 to-transparent rounded-full animate-blob-float delay-700" />
        
        {/* Floating particles around the blob */}
        <div className="absolute -inset-32">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float-particle"
              style={{
                left: `${20 + i * 10}%`,
                top: `${15 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + i * 0.3}s`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes blob-pulse {
          0%, 100% { 
            transform: scale(1) rotate(0deg);
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          25% { 
            transform: scale(1.05) rotate(5deg);
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
          50% { 
            transform: scale(0.98) rotate(-3deg);
            border-radius: 50% 60% 30% 60% / 60% 40% 60% 40%;
          }
          75% { 
            transform: scale(1.02) rotate(2deg);
            border-radius: 60% 40% 60% 30% / 40% 70% 40% 70%;
          }
        }
        
        @keyframes blob-morph {
          0%, 100% {
            transform: scale(1.1) rotate(10deg);
            border-radius: 40% 60% 60% 40% / 60% 40% 40% 60%;
          }
          50% {
            transform: scale(0.9) rotate(-8deg);
            border-radius: 60% 40% 30% 70% / 40% 60% 70% 30%;
          }
        }
        
        @keyframes blob-float {
          0%, 100% {
            transform: translateY(0px) scale(0.8);
            border-radius: 70% 30% 40% 60% / 30% 70% 60% 40%;
          }
          50% {
            transform: translateY(-10px) scale(1.1);
            border-radius: 40% 70% 60% 30% / 70% 30% 40% 60%;
          }
        }
        
        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.8;
          }
        }
        
        .animate-blob-pulse {
          animation: blob-pulse 6s ease-in-out infinite;
        }
        
        .animate-blob-morph {
          animation: blob-morph 8s ease-in-out infinite;
        }
        
        .animate-blob-float {
          animation: blob-float 5s ease-in-out infinite;
        }
        
        .animate-float-particle {
          animation: float-particle 4s ease-in-out infinite;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
        
        .mobile-liquid-blob {
          filter: blur(1px) brightness(1.1);
        }
      `}</style>
    </div>
  )
}

export default function LiquidBlob() {
  return (
    <>
      {/* Desktop: Three.js liquid blob */}
      <div className="hidden md:block fixed inset-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }} style={{ background: "transparent" }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#b0b0b0" />
          <LiquidBlobMesh />
        </Canvas>
      </div>
      
      {/* Mobile: CSS-only blob alternative */}
      <div className="md:hidden">
        <MobileBlobAlternative />
      </div>
    </>
  )
}

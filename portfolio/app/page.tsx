import ShaderBackground from "@/components/shader-background"
import LiquidBlob from "@/components/LiquidBlob"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import ScrollAnimations from "@/components/scroll-animations"
import AboutBlur from "@/components/AboutBlur"

export default function Home() {
  return (
    <main className="relative">
      {/* Background layer - this will get blurred */}
      <div id="background-layer" className="fixed inset-0 z-0">
        <ShaderBackground />
      </div>
      
      {/* Background text layer - behind liquid blob */}
      <div className="relative z-2">
        <HeroSection />
      </div>
      
      {/* Liquid blob layer - above background text but below specific hero content */}
      <div id="liquid-blob-layer" className="fixed inset-0 z-3">
        <LiquidBlob />
      </div>
      
      {/* Only "Software Engineer" text above liquid blob - overlays the hero section */}
      <div className="absolute top-0 left-0 right-0 z-4 pointer-events-none">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans text-balance leading-tight">
              <span className="block text-black font-medium drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] [text-shadow:0_0_30px_rgba(255,255,255,0.9)]">
                Software
              </span>
              <span className="block font-serif bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,255,255,0.9)] [text-shadow:0_0_40px_rgba(255,255,255,1),0_0_60px_rgba(255,255,255,0.8)] italic tracking-wide">
                Engineer
              </span>
            </h1>
          </div>
        </div>
      </div>
      
      {/* Content layer - stays crisp and above liquid blob */}
      <div className="relative z-10">
        <AboutBlur />
        <ScrollAnimations />
        <Navigation />
        <div className="scroll-reveal">
          <AboutSection />
        </div>
        <div className="scroll-reveal">
          <ContactSection />
        </div>
      </div>
    </main>
  )
}

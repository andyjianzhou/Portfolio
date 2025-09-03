import ShaderBackground from "@/components/shader-background"
import LiquidBlob from "@/components/LiquidBlob"
import HeroText from "@/components/HeroText"
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
      
      {/* Liquid blob layer - above background text but below hero content */}
      <div id="liquid-blob-layer" className="fixed inset-0 z-3">
        <LiquidBlob />
      </div>
      
      {/* Hero text overlay - above liquid blob, only visible in hero section */}
      <HeroText />
      
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

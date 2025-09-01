import ShaderBackground from "@/components/shader-background"
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
      
      {/* Content layer - stays crisp */}
      <div className="relative z-10">
        <AboutBlur />
        <ScrollAnimations />
        <Navigation />
        <div className="scroll-reveal">
          <HeroSection />
        </div>
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

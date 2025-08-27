import ThreeBackground from "@/components/three-background"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
// import PortfolioSection from "@/components/portfolio-section"
import ContactSection from "@/components/contact-section"
import ScrollAnimations from "@/components/scroll-animations"

export default function Home() {
  return (
    <main className="relative">
      <ThreeBackground />
      <ScrollAnimations />
      <Navigation />
      <div className="scroll-reveal">
        <HeroSection />
      </div>
      <div className="scroll-reveal">
        <AboutSection />
      </div>
      {/* <div className="scroll-reveal">
        <PortfolioSection />
      </div> */}
      <div className="scroll-reveal">
        <ContactSection />
      </div>
    </main>
  )
}

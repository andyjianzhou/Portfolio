"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"
import MorphingText from "./MorphingText"

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    
    if (!section || !text) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio
          const isLeaving = entry.boundingClientRect.top < 0
          
          if (isLeaving && ratio < 0.8) {
            // Quick Apple-style snap out
            text.style.opacity = '0'
            text.style.transform = 'translateY(20px) scale(0.95)'
          } else if (!isLeaving || ratio >= 0.8) {
            // Quick snap back in
            text.style.opacity = '1'
            text.style.transform = 'translateY(0px) scale(1)'
          }
        })
      },
      { 
        threshold: [0, 0.2, 0.5, 0.8, 1],
        rootMargin: '0px'
      }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Desktop: Horizontal massive text - behind slime ball */}
      <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <div className="hero-massive-text select-none">
          <div className="hero-text-line hero-text-gradient">
            BUILDING
          </div>
          <div className="hero-text-line">
            SCALABLE
          </div>
          <div className="hero-text-line">
            SOLUTIONS
          </div>
        </div>
      </div>

      {/* Mobile: Creative vertical design */}
      <div className="absolute inset-0 md:hidden flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <div className="mobile-hero-text-container select-none">
          <div className="mobile-hero-word mobile-hero-word-1" data-word="BUILDING">
            <span className="mobile-hero-letter">B</span>
            <span className="mobile-hero-letter">U</span>
            <span className="mobile-hero-letter">I</span>
            <span className="mobile-hero-letter">L</span>
            <span className="mobile-hero-letter">D</span>
            <span className="mobile-hero-letter">I</span>
            <span className="mobile-hero-letter">N</span>
            <span className="mobile-hero-letter">G</span>
          </div>
          <div className="mobile-hero-word mobile-hero-word-2" data-word="SCALABLE">
            <span className="mobile-hero-letter">S</span>
            <span className="mobile-hero-letter">C</span>
            <span className="mobile-hero-letter">A</span>
            <span className="mobile-hero-letter">L</span>
            <span className="mobile-hero-letter">A</span>
            <span className="mobile-hero-letter">B</span>
            <span className="mobile-hero-letter">L</span>
            <span className="mobile-hero-letter">E</span>
          </div>
          <div className="mobile-hero-word mobile-hero-word-3" data-word="SOLUTIONS">
            <span className="mobile-hero-letter">S</span>
            <span className="mobile-hero-letter">O</span>
            <span className="mobile-hero-letter">L</span>
            <span className="mobile-hero-letter">U</span>
            <span className="mobile-hero-letter">T</span>
            <span className="mobile-hero-letter">I</span>
            <span className="mobile-hero-letter">O</span>
            <span className="mobile-hero-letter">N</span>
            <span className="mobile-hero-letter">S</span>
          </div>
        </div>
      </div>

      {/* Scrolling text overlay - behind slime ball */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="scroll-text whitespace-nowrap text-6xl md:text-7xl font-serif font-light italic text-white select-none tracking-wide">
          ML Enthusiast • Software Developer • System Design • Data Engineering •
        </div>
      </div>

      {/* Name positioned above the sphere */}
      <div className="absolute top-[18%] md:top-[20%] left-1/2 transform -translate-x-1/2 text-center z-50">
        <div className="font-mono text-gray-200 uppercase text-center">
          {/* Mobile: Stacked vertically */}
          <div className="block md:hidden">
            <p className="text-lg tracking-[0.3em]">
              <MorphingText 
                englishText="A N D Y" 
                chineseText="周 健 龙"
                cycleDuration={8000}
                initialDelay={400}
                className="inline-block"
              />
            </p>
            <p className="text-lg tracking-[0.3em]">
              <MorphingText 
                englishText="Z H O U" 
                chineseText=""
                cycleDuration={8000}
                initialDelay={900}
                className="inline-block"
              />
            </p>
          </div>
          {/* Desktop: Horizontal with original spacing */}
          <div className="hidden md:block">
            <p className="text-xl tracking-[0.3em]">
              <MorphingText 
                englishText="A N D Y     Z H O U" 
                chineseText="周 健 龙"
                cycleDuration={8000}
                initialDelay={500}
                className="inline-block"
              />
            </p>
          </div>
        </div>
      </div>

      {/* Description and buttons positioned at the bottom */}
      <div ref={textRef} className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-center z-50 max-w-4xl px-6 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]">
        <div className="space-y-6">
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Engineering systems that <span className="prismatic-text font-semibold relative inline-block">power the future</span>
          </p>
          <div className="flex gap-4 justify-center">
            {/* TODO: Make tag to be "View my Work" for when my portfolio is here */}
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 transition-all duration-300 font-medium"
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            >
              About Me
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 hover:border-white transition-all duration-300 bg-transparent backdrop-blur-sm"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

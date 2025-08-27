"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"

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
      {/* Massive background text that fills the entire screen */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="hero-massive-text select-none">
          <div className="hero-text-line">BUILDING</div>
          <div className="hero-text-line hero-text-gradient">SCALABLE</div>
          <div className="hero-text-line">SOLUTIONS</div>
        </div>
      </div>

      {/* Software Developer text inside the sphere with strong contrast */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
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

      {/* Scrolling text overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-5">
        <div className="scroll-text whitespace-nowrap text-6xl md:text-7xl font-light text-white/3 select-none">
          AWS CERTIFIED • SOFTWARE DEVELOPER • SYSTEM OPTIMIZATION • CLOUD ARCHITECTURE •
        </div>
      </div>

      {/* Name positioned above the sphere */}
      <div className="absolute top-[18%] md:top-[20%] left-1/2 transform -translate-x-1/2 text-center z-20">
        <div className="font-mono text-gray-200 uppercase text-center">
          {/* Mobile: Stacked vertically */}
          <div className="block md:hidden">
            <p className="text-lg tracking-[0.3em]">A N D Y</p>
            <p className="text-lg tracking-[0.3em]">Z H O U</p>
          </div>
          {/* Desktop: Horizontal with original spacing */}
          <div className="hidden md:block">
            <p className="text-xl tracking-[0.3em]">
              A N D Y &nbsp;&nbsp; Z H O U
            </p>
          </div>
        </div>
      </div>

      {/* Description and buttons positioned at the bottom */}
      <div ref={textRef} className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-center z-20 max-w-4xl px-6 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]">
        <div className="space-y-6">
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Engineering systems that <span className="prismatic-text font-semibold relative inline-block">power the future</span>
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 transition-all duration-300 font-medium"
              onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
            >
              View My Work
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

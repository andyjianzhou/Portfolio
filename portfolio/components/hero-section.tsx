"use client"

import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Massive background text that fills the entire screen */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="hero-massive-text select-none">
          <div className="hero-text-line">BUILDING</div>
          <div className="hero-text-line hero-text-gradient">SCALABLE</div>
          <div className="hero-text-line">SOLUTIONS</div>
        </div>
      </div>

      {/* Scrolling text overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-5">
        <div className="scroll-text whitespace-nowrap text-6xl md:text-7xl font-light text-white/3 select-none">
          AWS CERTIFIED • FULL-STACK ENGINEER • SYSTEM OPTIMIZATION • CLOUD ARCHITECTURE •
        </div>
      </div>

      {/* Name positioned at the top */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 text-center z-20">
        <p className="text-sm md:text-base font-mono text-purple-400 tracking-[0.2em] uppercase mb-2">
          A N D Y &nbsp;&nbsp; Z H O U
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance leading-tight">
          Full-Stack
          <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Engineer
          </span>
        </h1>
      </div>

      {/* Description and buttons positioned at the bottom */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-center z-20 max-w-4xl px-6">
        <div className="space-y-6">
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Optimizing performance and building scalable cloud solutions that handle millions of users across global infrastructure
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

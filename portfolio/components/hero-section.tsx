"use client"

import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="gradient-blob-1"></div>
        <div className="gradient-blob-2"></div>
        <div className="gradient-blob-3"></div>
        <div className="gradient-blob-4"></div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="scroll-text whitespace-nowrap text-8xl md:text-9xl font-light text-white/5 select-none">
          CREATIVE DEVELOPER • DIGITAL EXPERIENCES • INNOVATIVE DESIGN • CUTTING-EDGE TECHNOLOGY •
        </div>
      </div>

      <div className="text-center z-10 max-w-4xl mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white text-balance">
          Creative
          <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Developer
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto text-pretty">
          Crafting digital experiences that blend innovative design with cutting-edge technology
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-black hover:bg-accent transition-colors duration-300"
            onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
          >
            View My Work
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-black transition-colors duration-300 bg-transparent"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </section>
  )
}

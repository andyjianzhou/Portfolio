"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"

export default function PortfolioHero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative">
      <div className="text-center space-y-8 max-w-4xl mx-auto px-6">
        <div className="space-y-4">
          <h1 className="font-serif text-6xl md:text-8xl font-bold text-foreground tracking-tight">
            Creative
            <span className="block text-muted-foreground">Developer</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Crafting digital experiences through innovative design and cutting-edge technology
          </p>
        </div>

        <div className="flex items-center justify-center gap-6 pt-8">
          <Button variant="outline" size="lg" className="group bg-transparent">
            <Github className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
            GitHub
          </Button>
          <Button variant="outline" size="lg" className="group bg-transparent">
            <Linkedin className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            LinkedIn
          </Button>
          <Button size="lg" className="group">
            <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Contact
          </Button>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  )
}

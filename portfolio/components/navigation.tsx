"use client"

import { useState } from "react"

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("home")

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-6">
      <div className="flex justify-center">
        <div className="flex gap-8 bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 border border-black/10 shadow-lg">
          {["home", "about", /* "portfolio", */ "contact"].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`text-black hover:text-black/60 transition-colors duration-300 capitalize font-medium ${
                activeSection === section ? "text-black/60" : ""
              }`}
            >
              {section}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

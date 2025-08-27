"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("education")

  const categories = {
    education: {
      title: "Education",
      items: [
        { year: "2023", title: "Computer Science Degree", subtitle: "University of Technology" },
        { year: "2021", title: "Web Development Bootcamp", subtitle: "Tech Academy" },
      ],
    },
    location: {
      title: "Location",
      items: [
        { year: "Current", title: "San Francisco, CA", subtitle: "Based in the heart of tech innovation" },
        { year: "2020", title: "New York, NY", subtitle: "Previously worked remotely" },
      ],
    },
    interests: {
      title: "Personal Interests",
      items: [
        { year: "Always", title: "Generative Art", subtitle: "Creating algorithmic visual experiences" },
        { year: "Hobby", title: "Photography", subtitle: "Capturing moments and compositions" },
      ],
    },
    learning: {
      title: "Currently Learning",
      items: [
        { year: "2024", title: "AI/ML Integration", subtitle: "Exploring AI-powered web experiences" },
        { year: "2024", title: "Advanced WebGL", subtitle: "Pushing 3D graphics boundaries" },
      ],
    },
    experience: {
      title: "Previously Interned At",
      items: [
        { year: "2023", title: "Meta", subtitle: "Frontend Engineering Intern" },
        { year: "2022", title: "Google", subtitle: "UX Engineering Intern" },
      ],
    },
  }

  const skills = ["React & Next.js", "Three.js & WebGL", "TypeScript", "Node.js", "UI/UX Design", "Creative Coding"]

  return (
    <section id="about" className="min-h-screen flex items-center py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold mb-12 text-white text-center">About Me</h2>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <div className="sticky top-24 space-y-2">
              {Object.entries(categories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full text-left px-6 py-4 rounded-xl transition-all duration-300 ${
                    activeTab === key
                      ? "bg-gradient-to-r from-white/15 to-gray-200/10 text-white border border-white/20 shadow-lg backdrop-blur-sm"
                      : "text-white/60 hover:text-white/80 hover:bg-white/5"
                  }`}
                >
                  <div className="font-medium">{category.title}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="min-h-[400px] relative">
              {Object.entries(categories).map(([key, category]) => (
                <div
                  key={key}
                  className={`absolute inset-0 transition-all duration-500 ${
                    activeTab === key ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                  }`}
                >
                  <div className="space-y-6">
                    {category.items.map((item, index) => (
                      <div key={index} className="flex items-start gap-6 group">
                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-white/20 to-gray-300/15 border border-white/15 flex items-center justify-center text-sm font-medium text-white/90 shadow-lg backdrop-blur-sm">
                          {item.year}
                        </div>
                        <div className="flex-1 pt-2">
                          <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-gray-200 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-white/70 leading-relaxed">{item.subtitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <Card className="bg-white/10 backdrop-blur-md border-white/15 p-6 sticky top-24 shadow-2xl">
              <h3 className="text-xl font-semibold mb-6 text-white tracking-tight">Skills & Technologies</h3>
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-lg p-3 text-center text-white/90 hover:bg-white/10 hover:text-white transition-all duration-300 text-sm border border-white/5 shadow-sm"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("experience")

  const categories = {
    experience: {
      title: "Professional Experience",
      items: [
        { year: "2025", title: "Amazon Web Services", subtitle: "Software Development Engineer Intern" },
        { year: "2024", title: "Royal Bank of Canada", subtitle: "Software Engineer Intern & MLH Fellow" },
        { year: "2023", title: "Arcurve Inc.", subtitle: "Software Engineer Intern" },
        { year: "2022", title: "BCharity", subtitle: "Software Engineer Intern" },
      ],
    },
    education: {
      title: "Education",
      items: [
        { year: "Current", title: "Bachelor of Computer Science", subtitle: "University of Alberta, Edmonton" },
      ],
    },
    learning: {
      title: "Currently Learning",
      items: [
        { year: "🤖", title: "LLMs & AI Integration", subtitle: "" },
        { year: "🏗️", title: "Distributed Systems", subtitle: "" },
        { year: "⚡", title: "System Design", subtitle: "" },
        { year: "☁️", title: "Cloud Infrastructure", subtitle: "" },
      ],
    },
    location: {
      title: "Location",
      items: [
        { year: "Current", title: "Edmonton, AB", subtitle: "University of Alberta student" },
        { year: "2025", title: "Vancouver, BC", subtitle: "Amazon Web Services internship" },
        { year: "2024", title: "Calgary, AB", subtitle: "Royal Bank of Canada & Arcurve Inc." },
      ],
    },
    interests: {
      title: "Personal Interests",
      items: [
        { year: "Always", title: "Sports & Athletics", subtitle: "Staying active and competitive" },
        { year: "Passion", title: "Machine Learning", subtitle: "Building AI-powered applications & solutions" },
      ],
    },
  }

  const skills = [
    "React & TypeScript",
    "Node.js & Python", 
    "AWS & Docker",
    "PostgreSQL & MongoDB",
    "PyTorch & ML",
    "Java & C#/.NET",
    "GraphQL & REST APIs",
    "Git & CI/CD"
  ]

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

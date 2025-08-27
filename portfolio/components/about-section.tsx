"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import "../styles/about-section.css"

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("experience")
  const [scrollProgress, setScrollProgress] = useState(0)

  const experiences = [
    {
      id: "aws",
      company: "Amazon Web Services",
      role: "Software Development Engineer Intern",
      year: "2025",
      duration: "Summer 2025",
      description: "Developing scalable cloud infrastructure and services, working with cutting-edge AWS technologies to build solutions that serve millions of users globally.",
      logo: "/logos/aws.svg",
      tags: ["AWS", "Cloud Computing", "Distributed Systems", "Data Optimization", "Data Engineering"]
    },
    {
      id: "rbc",
      company: "Royal Bank of Canada",
      role: "Software Engineer Intern & MLH Fellow",
      year: "2024", 
      duration: "Summer 2024",
      description: "Built financial technology solutions and contributed to digital banking platforms, focusing on security, performance, and user experience.",
      logo: "/logos/rbc.svg",
      tags: ["FinTech", "React", "Big-Data Optimization"]
    },
    {
      id: "arcurve",
      company: "Arcurve Inc.",
      role: "Software Engineer Intern",
      year: "2023",
      duration: "Summer 2023", 
      description: "Developed custom software solutions for enterprise clients, working with modern web technologies and agile development practices.",
      logo: "/logos/arcurve.svg",
      tags: ["Full-Stack", "Enterprise", "Agile"]
    },
    {
      id: "bcharity",
      company: "BCharity",
      role: "Software Engineer Intern",
      year: "2022",
      duration: "Summer 2022",
      description: "Created impactful solutions for non-profit organizations, building platforms that help charitable organizations reach their goals and connect with communities.",
      logo: "/logos/bcharity.svg",
      tags: ["Block Chain", "Social Impact", "Web Development"]
    }
  ]

  const categories = {
    experience: {
      title: "Experience",
      items: [
        { year: "2025", title: "Amazon Web Services", subtitle: "Software Development Engineer Intern", logo: "/logos/aws.svg" },
        { year: "2024", title: "Royal Bank of Canada", subtitle: "Software Engineer Intern & MLH Fellow", logo: "/logos/rbc.svg" },
        { year: "2023", title: "Arcurve Inc.", subtitle: "Software Engineer Intern", logo: "/logos/arcurve.svg" },
        { year: "2022", title: "BCharity", subtitle: "Software Engineer Intern", logo: "/logos/bcharity.svg" },
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

  useEffect(() => {
    if (activeTab === "experience") {
      const handleScroll = () => {
        const section = document.getElementById("experience-timeline")
        if (section) {
          const rect = section.getBoundingClientRect()
          const sectionHeight = section.offsetHeight
          const viewportHeight = window.innerHeight
          const scrolled = Math.max(0, viewportHeight - rect.top)
          const progress = Math.min(scrolled / (sectionHeight + viewportHeight), 1)
          setScrollProgress(progress)
        }
      }

      window.addEventListener("scroll", handleScroll)
      handleScroll()
      return () => window.removeEventListener("scroll", handleScroll)
    } else {
      // When switching away from experience, scroll back to About section
      const aboutSection = document.getElementById("about")
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }, [activeTab])

  return (
    <section id="about" className="min-h-screen flex items-center py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold mb-12 text-white text-center">About Me</h2>

        {/* Mobile category tabs - clean and simple */}
        <div className="mb-8 lg:hidden">
          <div className="flex flex-wrap gap-3 justify-center">
            {Object.entries(categories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-3 rounded-full transition-all duration-300 text-sm font-medium min-h-[44px] ${
                  activeTab === key
                    ? "bg-white/15 text-white border border-white/30 shadow-lg backdrop-blur-sm"
                    : "text-white/70 hover:text-white/90 hover:bg-white/10 border border-white/10 hover:border-white/20"
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Desktop sidebar - hidden on mobile */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-24 space-y-1">
              {Object.entries(categories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 text-sm ${
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

          <div className="lg:col-span-7 col-span-full">
            <div className="min-h-[400px] relative">
              {/* Experience Section with Timeline */}
              {activeTab === "experience" && (
                <div id="experience-timeline" className="relative min-h-[200vh]">
                  {/* Static timeline base line */}
                  <div
                    className="absolute left-8 top-0 w-1 bg-gradient-to-b from-white/20 via-gray-400/30 to-white/10 opacity-40"
                    style={{ height: "100%" }}
                  ></div>

                  {/* Animated progress line with aggressive silver gradient */}
                  <div
                    className="absolute left-8 top-0 w-1 bg-gradient-to-b from-white via-gray-200 to-gray-400 transition-all duration-500 shadow-2xl timeline-glow"
                    style={{ 
                      height: `${scrollProgress * 100}%`,
                      filter: 'brightness(1.2) contrast(1.1)',
                      boxShadow: '0 0 20px rgba(255,255,255,0.4), 0 0 40px rgba(200,200,200,0.2)'
                    }}
                  ></div>

                  <div className="space-y-32 pt-16">
                    {experiences.map((exp, index) => (
                      <div
                        key={index}
                        className="relative flex items-start space-x-8 opacity-0 translate-y-8 animate-fade-in-up"
                        style={{
                          animationDelay: `${index * 0.2}s`,
                          animationFillMode: "forwards",
                        }}
                      >
                        {/* Timeline dot with logo */}
                        <div className="relative z-10 flex-shrink-0">
                          <div className="w-16 h-16 bg-gradient-to-br from-gray-100/20 via-white/15 to-gray-300/20 backdrop-blur-md rounded-full border-4 border-white/30 shadow-2xl flex items-center justify-center timeline-dot-glow">
                            <Image
                              src={exp.logo}
                              alt={`${exp.company} logo`}
                              width={24}
                              height={24}
                              className="object-contain opacity-90 filter brightness-110 contrast-110"
                            />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-16">
                          <div className="mb-4">
                            <span className="inline-block bg-gradient-to-r from-white via-gray-200 to-white text-black px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg border border-white/20 apple-badge">
                              {exp.year}
                            </span>
                          </div>

                          <div className="relative">
                            <div className="bg-gradient-to-br from-gray-900/80 via-black/60 to-gray-800/70 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl card-glow border-backlight">
                              <h4 className="text-3xl font-bold text-white timeline-shimmer mb-3">{exp.company}</h4>
                              <p className="text-xl text-white/90 mb-3 font-medium">{exp.role}</p>
                              <p className="text-white/70 mb-6 text-sm font-mono">{exp.duration}</p>
                              <p className="text-white/80 mb-8 leading-relaxed max-w-3xl text-lg">{exp.description}</p>

                              <div className="flex flex-wrap gap-3">
                                {exp.tags.map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className="bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-full text-sm hover:bg-secondary transition-all duration-300 border border-border/50 shadow-sm backdrop-blur-sm"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Other Sections with Original Layout */}
              {Object.entries(categories).map(([key, category]) => {
                if (key === "experience") return null;
                return (
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
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-xl font-semibold text-white group-hover:text-gray-200 transition-colors">
                                {item.title}
                              </h3>
                              {'logo' in item && item.logo && (
                                <div className="company-logo-container flex-shrink-0 w-6 h-6 rounded-md bg-white/5 backdrop-blur-sm border border-white/10 p-1 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300 shadow-sm">
                                  <Image
                                    src={item.logo}
                                    alt={`${item.title} logo`}
                                    width={16}
                                    height={16}
                                    className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                                  />
                                </div>
                              )}
                            </div>
                            <p className="text-white/70 leading-relaxed">{item.subtitle}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-3">
            <Card className="bg-white/10 backdrop-blur-md border-white/15 p-4 sticky top-24 shadow-2xl">
              <h3 className="text-lg font-semibold mb-4 text-white tracking-tight">Skills & Technologies</h3>
              <div className="grid grid-cols-2 gap-2">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-lg p-2 text-center text-white/90 hover:bg-white/10 hover:text-white transition-all duration-300 text-xs border border-white/5 shadow-sm"
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

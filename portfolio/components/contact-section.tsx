"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    const contactSection = document.getElementById('contact')
    if (contactSection) {
      observer.observe(contactSection)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactMethods = [
    {
      icon: "📧",
      label: "Email",
      value: "andyzhou727@gmail.com",
      href: "mailto:andyzhou727@gmail.com",
      description: "Best for project inquiries"
    },
    {
      icon: "💼",
      label: "LinkedIn",
      value: "Connect professionally",
      href: "https://www.linkedin.com/in/andyzhou01/",
      description: "Professional networking"
    },
    {
      icon: "💻",
      label: "GitHub",
      value: "View my code",
      href: "https://github.com/andyjianzhou",
      description: "See my open source work"
    },
    {
      icon: "📄",
      label: "Resume",
      value: "Download PDF",
      href: "/resume.pdf",
      description: "View my experience"
    }
  ]

  return (
    <section id="contact" className="min-h-screen flex items-center py-20 relative">
      <div className="max-w-6xl mx-auto px-6 w-full">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Let's Create
            <span className="contact-text-gradient block mt-2">Something Amazing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your vision to life? Let's collaborate and build something extraordinary together.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Methods */}
          <div className={`lg:col-span-1 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <h3 className="text-2xl font-bold text-foreground mb-8">Get In Touch</h3>
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.label === "LinkedIn" || method.label === "GitHub" ? "_blank" : "_self"}
                  rel={method.label === "LinkedIn" || method.label === "GitHub" ? "noopener noreferrer" : ""}
                  className="group block transition-all duration-300"
                >
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card hover:-translate-y-1 transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="text-xl group-hover:scale-110 transition-transform duration-300">
                          {method.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-foreground">
                            {method.label}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {method.value}
                          </div>
                        </div>
                        <div className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300">
                          →
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className={`lg:col-span-2 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Send me a message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Input
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground resize-none"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 py-3 font-medium"
                  >
                    Send Message →
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

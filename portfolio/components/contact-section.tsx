"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Linkedin, Github, FileText } from "lucide-react"

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
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Contact Form Submission from ${formData.name}`)
    const body = encodeURIComponent(
      `Hi Andy,\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}\n\n` +
      `Best regards,\n${formData.name}`
    )
    
    const mailtoLink = `mailto:andyzhou727@gmail.com?subject=${subject}&body=${body}`
    window.open(mailtoLink, '_self')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "andyzhou727@gmail.com",
      href: "mailto:andyzhou727@gmail.com",
      description: "Best for project inquiries"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Connect professionally",
      href: "https://www.linkedin.com/in/andyzhou01/",
      description: "Professional networking"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "View my code",
      href: "https://github.com/andyjianzhou",
      description: "See my open source work"
    },
    {
      icon: FileText,
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
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground px-4">
            Let's Create
            <span className="contact-text-gradient block mt-4 mx-auto w-fit leading-tight pb-2">Something Amazing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Ready to bring your vision to life? Let's collaborate and build something extraordinary together.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Methods */}
          <div className={`lg:col-span-1 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <h3 className="text-2xl font-bold text-foreground mb-8">Get In Touch</h3>
            <div className="space-y-3">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon
                return (
                  <a
                    key={method.label}
                    href={method.href}
                    target={method.label === "LinkedIn" || method.label === "GitHub" ? "_blank" : "_self"}
                    rel={method.label === "LinkedIn" || method.label === "GitHub" ? "noopener noreferrer" : ""}
                    className="group flex items-center gap-4 py-3 px-2 rounded-lg hover:bg-white/5 transition-all duration-300 hover:translate-x-1"
                  >
                    <div className="text-muted-foreground group-hover:text-foreground group-hover:scale-110 transition-all duration-300">
                      <IconComponent size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground group-hover:text-white transition-colors duration-300">
                        {method.label}
                      </div>
                      <div className="text-sm text-muted-foreground group-hover:text-gray-300 transition-colors duration-300">
                        {method.value}
                      </div>
                    </div>
                    <div className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300 opacity-0 group-hover:opacity-100">
                      →
                    </div>
                  </a>
                )
              })}
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

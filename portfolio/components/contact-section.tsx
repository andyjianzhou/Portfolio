"use client"

import type React from "react"

import { useState } from "react"
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

  return (
    <section id="contact" className="min-h-screen flex items-center py-20">
      <div className="max-w-4xl mx-auto px-6 w-full">
        <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center text-black">Let's Create Together</h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Ready to bring your vision to life? I'm always excited to work on new projects and collaborate with
              creative minds. Let's discuss how we can create something amazing together.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <span className="text-black">hello@example.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <span className="text-black">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <span className="text-black">San Francisco, CA</span>
              </div>
            </div>
          </div>
          <Card className="bg-gray-50/80 backdrop-blur-sm border-gray-200">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-white border-gray-300 text-black placeholder:text-gray-500"
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
                    className="bg-white border-gray-300 text-black placeholder:text-gray-500"
                    required
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="bg-white border-gray-300 text-black placeholder:text-gray-500 resize-none"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-black text-white hover:bg-gray-800 transition-colors duration-300"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

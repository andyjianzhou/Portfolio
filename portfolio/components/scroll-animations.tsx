"use client"

import { useEffect } from "react"

export default function ScrollAnimations() {
  // TEMPORARILY DISABLED FOR DEBUGGING
  // useEffect(() => {
  //   const observerOptions = {
  //     threshold: 0.1,
  //     rootMargin: "0px 0px -50px 0px",
  //   }

  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         entry.target.classList.add("revealed")
  //       }
  //     })
  //   }, observerOptions)

  //   // Observe all scroll-reveal elements
  //   const scrollElements = document.querySelectorAll(".scroll-reveal")
  //   scrollElements.forEach((el) => observer.observe(el))

  //   const handleScroll = () => {
  //     const scrolled = window.pageYOffset
  //     const parallaxElements = document.querySelectorAll(".parallax-slow, .parallax-fast")

  //     parallaxElements.forEach((element) => {
  //       const speed = element.classList.contains("parallax-fast") ? 0.5 : 0.2
  //       const yPos = -(scrolled * speed)
  //       ;(element as HTMLElement).style.setProperty("--scroll-y", `${yPos}px`)
  //     })
  //   }

  //   window.addEventListener("scroll", handleScroll)

  //   return () => {
  //     observer.disconnect()
  //     window.removeEventListener("scroll", handleScroll)
  //   }
  // }, [])

  return null
}

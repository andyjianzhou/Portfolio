"use client"

import { motion, useScroll, useTransform } from "framer-motion"

export default function HeroText() {
  const { scrollY } = useScroll()
  
  // Two-stage effect:
  // Stage 1 (0-200px): Squish the text vertically
  // Stage 2 (200-400px): Stop squishing, start clipping from top downwards
  
  // Stage 1: Squishing effect
  const scaleY = useTransform(scrollY, [0, 200], [1, 0.3]) // Squish to 30% height
  
  // Stage 2: Clipping effect (starts after squishing is done)
  const clipProgress = useTransform(scrollY, [200, 400], [0, 100]) // Clip from top downwards
  
  // Hide component completely when fully clipped to avoid visual artifacts
  const opacity = useTransform(scrollY, [380, 400], [1, 0])
  
  return (
    <div className="fixed inset-0 z-4 pointer-events-none">
      <div className="flex items-center justify-center h-screen">
        <motion.div 
          className="text-center"
          style={{
            opacity, // Fade out completely at the end
          }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-sans text-balance leading-tight"
            style={{
              scaleY, // First stage: squishing
              transformOrigin: "bottom", // Squish from bottom up
              clipPath: useTransform(clipProgress, (value) => `inset(${value}% 0 0 0)`), // Second stage: clip from top down
              willChange: "transform, clip-path", // Optimize rendering
              backfaceVisibility: "hidden", // Prevent rendering artifacts
            }}
          >
            <span className="block text-black font-medium drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] [text-shadow:0_0_30px_rgba(255,255,255,0.9)]">
              Software
            </span>
            <span className="block font-serif bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,255,255,0.9)] [text-shadow:0_0_40px_rgba(255,255,255,1),0_0_60px_rgba(255,255,255,0.8)] italic tracking-wide">
              Engineer
            </span>
          </motion.h1>
        </motion.div>
      </div>
    </div>
  )
}

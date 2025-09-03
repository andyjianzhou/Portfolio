"use client"

import { motion, useScroll, useTransform } from "framer-motion"

export default function HeroText() {
  const { scrollY } = useScroll()
  
  // Transform scroll position to create the flatten-to-line effect
  // Stage 1 (0-200px): Gradually flatten from bottom up
  // Stage 2 (200-250px): Become a thin line
  // Stage 3 (250px+): Disappear completely
  const scaleY = useTransform(scrollY, [0, 200, 250], [1, 0.05, 0]) // Flatten to almost nothing, then disappear
  const opacity = useTransform(scrollY, [0, 180, 250], [1, 0.8, 0]) // Stay visible while flattening, then fade out
  
  return (
    <div className="fixed inset-0 z-4 pointer-events-none">
      <div className="flex items-center justify-center h-screen">
        <motion.div 
          className="text-center"
          style={{
            scaleY,
            opacity,
            transformOrigin: "bottom", // Critical: ensures it flattens from bottom up
          }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans text-balance leading-tight">
            <span className="block text-black font-medium drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] [text-shadow:0_0_30px_rgba(255,255,255,0.9)]">
              Software
            </span>
            <span className="block font-serif bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,255,255,0.9)] [text-shadow:0_0_40px_rgba(255,255,255,1),0_0_60px_rgba(255,255,255,0.8)] italic tracking-wide">
              Engineer
            </span>
          </h1>
        </motion.div>
      </div>
    </div>
  )
}

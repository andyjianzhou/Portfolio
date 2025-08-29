"use client"

import { useState, useEffect, useRef } from "react"

interface MorphingTextProps {
  englishText: string
  chineseText: string
  className?: string
  cycleDuration?: number
}

const glitchChars = ['█', '▓', '▒', '░', '▄', '▀', '▌', '▐', '■', '□', '▪', '▫', '◆', '◇', '◢', '◣', '◤', '◥']
const randomChars = ['0', '1', 'X', 'Z', '∴', '∵', '∷', '∽', '≈', '≠', '≡', '≤', '≥', '∞', '∫', '∮']

export default function MorphingText({ 
  englishText, 
  chineseText, 
  className = "", 
  cycleDuration = 6000
}: MorphingTextProps) {
  const [displayText, setDisplayText] = useState(englishText)
  const [isGlitching, setIsGlitching] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const glitchRef = useRef<NodeJS.Timeout | null>(null)

  const morphText = async (fromText: string, toText: string) => {
    const maxLength = Math.max(fromText.length, toText.length)
    const steps = 20 // Number of glitch steps
    
    for (let step = 0; step <= steps; step++) {
      const progress = step / steps
      let newText = ''
      
      for (let i = 0; i < maxLength; i++) {
        const fromChar = fromText[i] || ' '
        const toChar = toText[i] || ' '
        
        if (progress === 1) {
          // Final step - show target text
          newText += toChar
        } else {
          // Calculate if this character should start morphing
          const charProgress = Math.max(0, (progress * maxLength - i) / 3)
          
          if (charProgress <= 0) {
            // Not started morphing yet
            newText += fromChar
          } else if (charProgress >= 1) {
            // Finished morphing
            newText += toChar
          } else {
            // Currently morphing - show glitch effect
            if (Math.random() < 0.7) {
              // Show random glitch characters
              const glitchArray = Math.random() < 0.6 ? glitchChars : randomChars
              newText += glitchArray[Math.floor(Math.random() * glitchArray.length)]
            } else if (Math.random() < 0.5) {
              newText += fromChar
            } else {
              newText += toChar
            }
          }
        }
      }
      
      setDisplayText(newText)
      setIsGlitching(step > 0 && step < steps)
      
      // Variable delay for more organic glitch effect
      const delay = step < 5 ? 100 : step < 15 ? 50 : 80
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  useEffect(() => {
    let currentIsEnglish = true
    
    const startMorphCycle = () => {
      intervalRef.current = setInterval(async () => {
        const fromText = currentIsEnglish ? englishText : chineseText
        const toText = currentIsEnglish ? chineseText : englishText
        
        await morphText(fromText, toText)
        currentIsEnglish = !currentIsEnglish
      }, cycleDuration)
    }

    startMorphCycle()

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (glitchRef.current) clearTimeout(glitchRef.current)
    }
  }, [englishText, chineseText, cycleDuration])

  return (
    <span 
      className={`glitch-morph-text ${isGlitching ? 'glitching' : ''} ${className}`}
      style={{
        fontFamily: 'monospace',
        letterSpacing: '0.1em',
        textShadow: isGlitching 
          ? `
            2px 0 rgba(255, 255, 255, 0.7),
            -2px 0 rgba(200, 200, 200, 0.5),
            0 2px rgba(150, 150, 150, 0.6),
            0 -2px rgba(180, 180, 180, 0.4),
            1px 1px rgba(120, 120, 120, 0.3),
            -1px -1px rgba(220, 220, 220, 0.5)
          `
          : 'none',
        filter: isGlitching ? 'contrast(1.2) brightness(1.1) saturate(0) blur(0.5px)' : 'none',
        transform: isGlitching ? `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)` : 'none'
      }}
    >
      {displayText}
    </span>
  )
}

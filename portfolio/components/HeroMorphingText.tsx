"use client"

import { useState, useEffect, useRef } from "react"

interface TextPair {
  english: string
  chinese: string
}

interface HeroMorphingTextProps {
  textPairs: TextPair[]
  cycleDuration?: number
}

const glitchChars = ['█', '▓', '▒', '░', '▄', '▀', '▌', '▐', '■', '□', '▪', '▫', '◆', '◇']
const techChars = ['0', '1', 'X', 'Z', 'α', 'β', 'γ', 'δ', 'ω', 'π', 'σ', 'τ', 'λ', 'μ']
const matrixChars = ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ']

type GlitchLine = {
  text: string
  isGlitching: boolean
  glitchIntensity: number
}

export default function HeroMorphingText({ 
  textPairs, 
  cycleDuration = 12000 
}: HeroMorphingTextProps) {
  const [lines, setLines] = useState<GlitchLine[]>(
    textPairs.map(pair => ({ text: pair.english, isGlitching: false, glitchIntensity: 0 }))
  )
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const glitchMorphLine = async (lineIndex: number, fromText: string, toText: string) => {
    const steps = 25
    const maxLength = Math.max(fromText.length, toText.length)
    
    for (let step = 0; step <= steps; step++) {
      const progress = step / steps
      const intensity = Math.sin(progress * Math.PI) // Peak intensity in middle
      let newText = ''
      
      for (let i = 0; i < maxLength; i++) {
        const fromChar = fromText[i] || ' '
        const toChar = toText[i] || ' '
        
        if (progress === 1) {
          newText += toChar
        } else {
          const charProgress = Math.max(0, (progress * 1.5 - i / maxLength) / 0.5)
          
          if (charProgress <= 0) {
            newText += fromChar
          } else if (charProgress >= 1) {
            newText += toChar
          } else {
            // INTENSE GLITCH ZONE
            const rand = Math.random()
            const glitchProbability = intensity * 0.8
            
            if (rand < glitchProbability) {
              if (rand < glitchProbability * 0.4) {
                newText += glitchChars[Math.floor(Math.random() * glitchChars.length)]
              } else if (rand < glitchProbability * 0.7) {
                newText += techChars[Math.floor(Math.random() * techChars.length)]
              } else {
                newText += matrixChars[Math.floor(Math.random() * matrixChars.length)]
              }
            } else if (rand < 0.5) {
              newText += fromChar
            } else {
              newText += toChar
            }
          }
        }
      }
      
      setLines(prev => prev.map((line, idx) => 
        idx === lineIndex 
          ? { text: newText, isGlitching: step > 0 && step < steps, glitchIntensity: intensity }
          : line
      ))
      
      // Dynamic timing for chaos
      const delay = intensity > 0.7 ? 30 : intensity > 0.3 ? 60 : 100
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  const triggerMorphSequence = async () => {
    // Check current state based on the first line
    const isCurrentlyEnglish = lines[0].text === textPairs[0].english
    
    // Staggered morph with chaos
    for (let i = 0; i < textPairs.length; i++) {
      setTimeout(async () => {
        const fromText = isCurrentlyEnglish ? textPairs[i].english : textPairs[i].chinese
        const toText = isCurrentlyEnglish ? textPairs[i].chinese : textPairs[i].english
        await glitchMorphLine(i, fromText, toText)
      }, i * 300) // Stagger each line
    }
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      triggerMorphSequence()
    }, cycleDuration)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [cycleDuration])

  return (
    <div className="hero-massive-text select-none">
      {lines.map((line, index) => {
        const baseIntensity = line.glitchIntensity
        const randomOffset = Math.random() * 6 - 3
        
        return (
          <div 
            key={index}
            className={`hero-text-line ${index === 1 ? 'hero-text-gradient' : ''} cyber-glitch-line`}
            style={{
              fontFamily: 'system-ui, -apple-system, monospace',
              letterSpacing: line.isGlitching ? '0.2em' : '-0.05em',
              textShadow: line.isGlitching 
                ? `
                  ${randomOffset}px 0 rgba(255, 255, 255, 0.8),
                  ${-randomOffset}px 0 rgba(200, 200, 200, 0.6),
                  0 ${randomOffset}px rgba(150, 150, 150, 0.4),
                  ${randomOffset * 0.5}px ${randomOffset * 0.5}px rgba(100, 100, 100, 0.5),
                  ${-randomOffset * 0.5}px ${-randomOffset * 0.5}px rgba(180, 180, 180, 0.3),
                  0 0 ${baseIntensity * 40}px rgba(255, 255, 255, 0.6)
                `
                : 'none',
              filter: line.isGlitching 
                ? `
                  contrast(${1 + baseIntensity * 0.3}) 
                  brightness(${1 + baseIntensity * 0.2}) 
                  saturate(0)
                  blur(${baseIntensity * 0.5}px)
                `
                : 'none',
              transform: line.isGlitching 
                ? `
                  translate(
                    ${Math.sin(Date.now() * 0.01 + index) * baseIntensity * 8}px, 
                    ${Math.cos(Date.now() * 0.01 + index) * baseIntensity * 4}px
                  )
                  scale(${1 + baseIntensity * 0.02})
                  skew(${baseIntensity * 2}deg, ${baseIntensity}deg)
                `
                : 'none',
              animation: line.isGlitching ? `glitch-shake 0.1s infinite` : 'none',
              WebkitTextStroke: line.isGlitching ? `1px rgba(255, 255, 255, ${baseIntensity * 0.3})` : 'none'
            }}
          >
            {line.text}
          </div>
        )
      })}
    </div>
  )
}

"use client"

import { useState } from "react"
import { MeshGradient } from "@paper-design/shaders-react"

export default function ShaderBackground() {
  const [speed] = useState(1.0)

  return (
    <div className="fixed inset-0">
      <MeshGradient
        className="w-full h-full"
        colors={["#000000", "#0a0a0a", "#1a1a1a", "#2a2a2a"]}
        speed={speed}
      />
    </div>
  )
}

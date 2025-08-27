import { Card, CardContent } from "@/components/ui/card"

export default function PortfolioSection() {
  const projects = [
    {
      title: "Interactive 3D Gallery",
      description: "A WebGL-powered art gallery with immersive navigation and dynamic lighting.",
      tech: ["Three.js", "React", "GLSL"],
      image: "/abstract-3d-gallery-with-geometric-shapes.png",
    },
    {
      title: "AI-Powered Dashboard",
      description: "Real-time analytics dashboard with machine learning insights and data visualization.",
      tech: ["Next.js", "D3.js", "Python"],
      image: "/modern-dashboard.png",
    },
    {
      title: "Generative Art Platform",
      description: "Creative coding platform for artists to create and share algorithmic art.",
      tech: ["p5.js", "Node.js", "MongoDB"],
      image: "/generative-art-with-flowing-patterns.png",
    },
    {
      title: "VR Experience",
      description: "Immersive virtual reality experience for architectural visualization.",
      tech: ["A-Frame", "WebXR", "Blender"],
      image: "/virtual-reality-architectural-space.png",
    },
  ]

  return (
    <section id="portfolio" className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center text-black">Featured Work</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="bg-gray-50/80 backdrop-blur-sm border-gray-200 overflow-hidden hover:bg-gray-100/80 transition-all duration-300 group cursor-pointer"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 text-black">{project.title}</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-gray-200 text-black text-sm px-3 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

export default function PortfolioProjects() {
  const projects = [
    {
      title: "3D Interactive Dashboard",
      description: "A data visualization platform with immersive 3D charts and real-time analytics.",
      tech: ["React", "Three.js", "D3.js", "WebGL"],
      image: "/3d-dashboard-with-charts-and-graphs.png",
    },
    {
      title: "AI-Powered Design Tool",
      description: "Machine learning application that generates design suggestions based on user preferences.",
      tech: ["Next.js", "Python", "TensorFlow", "PostgreSQL"],
      image: "/ai-design-interface-with-modern-ui.png",
    },
    {
      title: "Immersive Portfolio Site",
      description: "A creative portfolio website featuring abstract 3D elements and smooth animations.",
      tech: ["React", "Three.js", "Framer Motion", "TypeScript"],
      image: "/abstract-3d-portfolio-website.png",
    },
  ]

  return (
    <section className="py-24 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-card-foreground mb-6">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent work showcasing creativity, technical skill, and attention to detail.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className="group hover:shadow-2xl transition-all duration-300 bg-background border-border"
            >
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-serif text-xl text-foreground">{project.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                  <Button size="sm" className="flex-1">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

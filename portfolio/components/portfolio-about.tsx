import { Card } from "@/components/ui/card"

export default function PortfolioAbout() {
  const skills = ["React & Next.js", "TypeScript", "Three.js & WebGL", "Node.js", "Python", "UI/UX Design"]

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">About Me</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I'm a passionate developer who loves creating immersive digital experiences. With a background in both
                design and development, I bridge the gap between beautiful interfaces and robust functionality.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open source projects, or
                experimenting with 3D graphics and animations.
              </p>
            </div>
          </div>

          <Card className="p-8 bg-card border-border">
            <h3 className="font-serif text-2xl font-bold text-card-foreground mb-6">Skills & Technologies</h3>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={skill}
                  className="p-3 bg-secondary rounded-lg text-secondary-foreground text-center font-medium hover:bg-accent transition-colors"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
